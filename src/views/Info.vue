<template>
  <div class="info-page">
    <!-- 顶部导航 -->
    <div class="tab-nav">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-btn', { active: currentTab === tab.id }]"
        @click="currentTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="tab-content">
      <!-- Wallet 模块 -->
      <div v-if="currentTab === 'wallet'" class="wallet-section">
        <div class="section-header">
          <h2>WALLETS</h2>
          <button class="add-btn" @click="showAddWalletModal = true">
            <span>+</span>
            Add Wallet
          </button>
        </div>

        <div class="wallet-list">
          <div v-for="wallet in wallets" :key="wallet.id" class="wallet-item">
            <div class="wallet-main">
              <div class="wallet-info">
                <div class="chain-selector" @click="openChainSelect(wallet)">
                  <i :class="wallet.icon"></i>
                  <span>{{ wallet.name }}</span>
                  <i class="fas fa-chevron-down dropdown-btn"></i>
                </div>
              </div>
              <div class="wallet-input">
                <input 
                  type="text" 
                  v-model="wallet.address" 
                  :placeholder="wallet.connected ? wallet.address : 'Please enter your address'"
                  :readonly="wallet.connected"
                />
              </div>
            </div>
            <div class="wallet-actions">
              <button 
                class="connect-btn"
                :class="{ connected: wallet.connected }"
                @click="connectWallet(wallet)"
              >
                {{ wallet.connected ? 'CONNECTED' : 'CONNECT' }}
              </button>
              <button 
                class="remove-btn"
                @click="deleteWallet(wallet.id)"
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Media 模块 -->
      <div v-if="currentTab === 'social'" class="social-section">
        <h2>SOCIAL MEDIA</h2>
        <div class="social-list">
          <div v-for="social in socials" :key="social.id" class="social-item">
            <div class="platform-info">
              <i :class="social.icon"></i>
              <span>{{ social.name }}</span>
            </div>
            <div class="social-input">
              <input 
                type="text" 
                v-model="social.link" 
                :placeholder="social.connected ? social.link : 'Please enter the link'"
                :readonly="social.connected"
              />
              <i 
                v-if="social.connected" 
                class="fas fa-times clear-icon"
                @click="clearSocialLink(social)"
              ></i>
            </div>
            <button 
              class="connect-btn"
              :class="{ connected: social.connected }"
              @click="connectSocial(social)"
            >
              {{ social.connected ? 'CONNECTED' : 'CONNECT' }}
            </button>
          </div>
        </div>
      </div>

      <!-- CEX ID 模块 -->
      <div v-if="currentTab === 'cex'" class="cex-section">
        <h2>CEX ID</h2>
        <div class="cex-list">
          <div v-for="cex in cexes" :key="cex.id" class="cex-item">
            <div class="platform-info">
              <i :class="cex.icon"></i>
              <span>{{ cex.name }}</span>
            </div>
            <div class="cex-input">
              <input 
                type="text" 
                v-model="cex.cexId" 
                :placeholder="cex.connected ? cex.cexId : 'Please enter your ID'"
                :readonly="cex.connected"
              />
              <i 
                v-if="cex.connected" 
                class="fas fa-times clear-icon"
                @click="clearCexId(cex)"
              ></i>
            </div>
            <button 
              class="connect-btn"
              :class="{ connected: cex.connected }"
              @click="connectCex(cex)"
            >
              {{ cex.connected ? 'CONNECTED' : 'CONNECT' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Address 模块 -->
      <div v-if="currentTab === 'address'" class="address-section">
        <h2>ADDRESS</h2>
        <div class="address-form">
          <div class="form-row">
            <div class="form-group">
              <label>Name</label>
              <input type="text" value="1293124101" />
            </div>
            <div class="form-group phone-group">
              <label>Phone Number</label>
              <div class="phone-input">
                <select class="country-code">
                  <option value="+86">+86</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+81">+81</option>
                  <option value="+82">+82</option>
                </select>
                <input type="text" value="1293124101" />
              </div>
            </div>
          </div>

          <div class="address-section">
            <label>Address</label>
            <div class="location-row">
              <div class="select-group">
                <select v-model="selectedCountry" @change="handleCountryChange">
                  <option value="">Please select your Country</option>
                  <option v-for="country in countries" 
                          :key="country.code" 
                          :value="country.code">
                    {{ country.name }}
                  </option>
                </select>
              </div>
              <div class="select-group">
                <select v-model="selectedCity" :disabled="!selectedCountry">
                  <option value="">Please select your City</option>
                  <option v-for="city in availableCities" 
                          :key="city" 
                          :value="city">
                    {{ city }}
                  </option>
                </select>
              </div>
            </div>
            <textarea placeholder="Please enter your detailed address"></textarea>
          </div>

          <button class="save-btn">Save</button>
        </div>
      </div>
    </div>

    <!-- 添加钱包弹窗 -->
    <div v-if="showAddWalletModal" class="modal-overlay" @click="showAddWalletModal = false">
      <div class="modal-content" @click.stop>
        <h3>Add New Wallet</h3>
        <div class="chain-list">
          <div 
            v-for="chain in availableChains" 
            :key="chain.id"
            class="chain-option"
            @click="addNewWallet(chain)"
          >
            <i :class="chain.icon"></i>
            <span>{{ chain.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 切换公链弹窗 -->
    <div v-if="showChainModal" class="modal-overlay" @click="showChainModal = false">
      <div class="modal-content" @click.stop>
        <h3>Select Chain</h3>
        <div class="chain-list">
          <div 
            v-for="chain in availableChains" 
            :key="chain.id"
            class="chain-option"
            @click="switchChain(chain)"
          >
            <i :class="chain.icon"></i>
            <span>{{ chain.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-page {
  width: 100%;
}

.tab-nav {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.tab-btn {
  padding: 12px 32px;
  border-radius: 30px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover, &.active {
    background: rgba(255,255,255,0.1);
  }
}

.tab-content {
  background: linear-gradient(180deg, rgba(17, 17, 17, 0.9) 0%, rgba(17, 17, 17, 0.8) 100%);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 20px;
    background: rgba(17, 17, 17, 0.95);
  }

  h2 {
    font-size: 24px;
    margin-bottom: 24px;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.1);
  }

  span {
    font-size: 18px;
  }
}

.wallet-list, .social-list, .cex-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wallet-item, .social-item, .cex-item {
  background: rgba(255,255,255,0.05);
  border-radius: 15px;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.1);
}

.wallet-item {
  .wallet-main {
    margin-bottom: 16px;
  }

  .wallet-info {
    margin-bottom: 16px;
  }

  .wallet-input {
    input {
      width: 100%;
      padding: 12px 16px;
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.3);
      color: #fff;
      font-size: 14px;

      &::placeholder {
        color: rgba(255,255,255,0.5);
      }
    }
  }

  .wallet-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
}

.chain-selector {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 15px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;

  i {
    font-size: 20px;
  }

  .dropdown-btn {
    font-size: 12px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(255,255,255,0.05);
  }
}

.connect-btn, .remove-btn {
  min-width: 120px;
  padding: 12px 24px;
  border-radius: 15px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.3);
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.05);
  }

  &.connected {
    background: rgba(76, 175, 80, 0.1);
    border-color: #4CAF50;
    color: #4CAF50;
  }
}

.remove-btn {
  color: #999;
}

.social-item, .cex-item {
  display: flex;
  align-items: center;
  gap: 24px;

  .platform-info {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 140px;

    i {
      font-size: 20px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .social-input, .cex-input {
    flex: 1;
    position: relative;

    input {
      width: 100%;
      padding: 12px 16px;
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.3);
      color: #fff;
      font-size: 14px;

      &::placeholder {
        color: rgba(255,255,255,0.5);
      }

      &[readonly] {
        opacity: 0.6;
        cursor: default;
      }
    }

    .clear-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    
    .platform-info {
      min-width: auto;
      width: 100%;
    }
    
    .social-input, .cex-input {
      width: 100%;
    }
    
    .connect-btn {
      align-self: flex-end;
      margin-top: 8px;
    }
  }
}

.address-form {
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  .form-group {
    label {
      display: block;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 12px 16px;
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.3);
      color: #fff;
      font-size: 14px;
    }
  }

  .phone-input {
    display: flex;
    gap: 12px;

    select {
      width: 100px;
    }

    input {
      flex: 1;
    }
  }

  .location-row {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;

    .select-group {
      flex: 1;
    }
  }

  select, textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 15px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.3);
    color: #fff;
    font-size: 14px;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  textarea {
    height: 120px;
    resize: none;
    margin-bottom: 24px;
    padding: 12px 16px;
    border-radius: 15px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.3) !important;
    color: #fff;
    font-size: 14px;
    background-image: none !important;
  }

  .save-btn {
    min-width: 100px;
    padding: 12px 24px;
    border-radius: 15px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.3);
    color: #fff;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: rgba(255,255,255,0.05);
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1a1a1a;
  border-radius: 20px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  border: 1px solid rgba(255,255,255,0.1);

  h3 {
    margin-bottom: 20px;
    font-size: 20px;
  }
}

.chain-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chain-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.05);
  }

  i {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .tab-nav {
    flex-wrap: wrap;
    
    .tab-btn {
      flex: 1;
      min-width: calc(50% - 8px);
      padding: 10px;
      font-size: 14px;
    }
  }

  .social-item, .cex-item {
    flex-direction: column;
    gap: 16px;
    
    .platform-info {
      min-width: auto;
    }
    
    .connect-btn {
      align-self: flex-end;
    }
  }

  .form-row {
    grid-template-columns: 1fr !important;
  }

  .location-row {
    flex-direction: column;
  }
}
</style> 

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { id: 'wallet', name: 'WALLET' },
  { id: 'social', name: 'SOCIAL MEDIA' },
  { id: 'cex', name: 'CEX ID' },
  { id: 'address', name: 'ADDRESS' }
]

const currentTab = ref('wallet')
const showAddWalletModal = ref(false)
const showChainModal = ref(false)
const selectedWallet = ref(null)

const availableChains = [
  { id: 'eth', name: 'ETH (Ethereum)', icon: 'fab fa-ethereum' },
  { id: 'btc', name: 'BTC (Bitcoin)', icon: 'fab fa-bitcoin' },
  { id: 'sol', name: 'SOL (Solana)', icon: 'fa-solid fa-circle-nodes' },
  { id: 'bnb', name: 'BNB (Binance)', icon: 'fas fa-coins' },
  { id: 'matic', name: 'MATIC (Polygon)', icon: 'fas fa-project-diagram' }
]

const wallets = ref([
  { 
    id: 1, 
    chainId: 'eth',
    name: 'ETH (Ethereum)', 
    icon: 'fab fa-ethereum',
    address: '0xd6dfd96e69261434394AE34b24a5b63A4469C834',
    connected: true
  },
  { 
    id: 2, 
    chainId: 'btc',
    name: 'BTC (Bitcoin)', 
    icon: 'fab fa-bitcoin',
    address: '',
    connected: false
  },
  { 
    id: 3, 
    chainId: 'sol',
    name: 'SOL (Solana)', 
    icon: 'fa-solid fa-circle-nodes',
    address: '',
    connected: false
  }
])

const socials = ref([
  {
    id: 1,
    name: 'X (Twitter)',
    icon: 'fab fa-x-twitter',
    link: 'https://www.twitter.com/',
    connected: true
  },
  {
    id: 2,
    name: 'Email',
    icon: 'fas fa-envelope',
    link: '',
    connected: false
  },
  {
    id: 3,
    name: 'Telegram',
    icon: 'fab fa-telegram',
    link: '',
    connected: false
  },
  {
    id: 4,
    name: 'Github',
    icon: 'fab fa-github',
    link: '',
    connected: false
  }
])

const cexes = ref([
  {
    id: 1,
    name: 'OKEX',
    icon: 'fas fa-building-columns',
    cexId: '1293124101',
    connected: true
  },
  {
    id: 2,
    name: 'Binance',
    icon: 'fas fa-coins',
    cexId: '',
    connected: false
  },
  {
    id: 3,
    name: 'Bybit',
    icon: 'fas fa-chart-line',
    cexId: '',
    connected: false
  }
])

// 国家和城市数据
const countries = [
  { 
    code: 'CN', 
    name: 'China',
    cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
  },
  { 
    code: 'US', 
    name: 'United States',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston']
  },
  { 
    code: 'JP', 
    name: 'Japan',
    cities: ['Tokyo', 'Osaka', 'Nagoya', 'Kyoto']
  }
]

const selectedCountry = ref('')
const selectedCity = ref('')
const availableCities = ref([])

// 方法
const openChainSelect = (wallet) => {
  selectedWallet.value = wallet
  showChainModal.value = true
}

const switchChain = (chain) => {
  if (selectedWallet.value) {
    selectedWallet.value.chainId = chain.id
    selectedWallet.value.name = chain.name
    selectedWallet.value.icon = chain.icon
    selectedWallet.value.address = ''
    selectedWallet.value.connected = false
  }
  showChainModal.value = false
}

const addNewWallet = (chain) => {
  const newWallet = {
    id: Date.now(),
    chainId: chain.id,
    name: chain.name,
    icon: chain.icon,
    address: '',
    connected: false
  }
  wallets.value.push(newWallet)
  showAddWalletModal.value = false
}

const connectWallet = (wallet) => {
  if (wallet.address) {
    wallet.connected = true
  }
}

const deleteWallet = (id) => {
  if (confirm('Are you sure you want to delete this wallet?')) {
    wallets.value = wallets.value.filter(wallet => wallet.id !== id)
  }
}

const connectSocial = (social) => {
  if (social.link) {
    social.connected = true
  }
}

const clearSocialLink = (social) => {
  social.link = ''
  social.connected = false
}

const connectCex = (cex) => {
  if (cex.cexId) {
    cex.connected = true
  }
}

const clearCexId = (cex) => {
  cex.cexId = ''
  cex.connected = false
}

const handleCountryChange = () => {
  selectedCity.value = ''
  const country = countries.find(c => c.code === selectedCountry.value)
  availableCities.value = country ? country.cities : []
}

// 根据路由参数设置当前 tab
onMounted(() => {
  const tabFromQuery = route.query.tab
  if (tabFromQuery && tabs.some(tab => tab.id === tabFromQuery)) {
    currentTab.value = tabFromQuery
  }
})
</script> 