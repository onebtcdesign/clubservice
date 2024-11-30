<template>
  <div class="airdrop-page">
    <!-- 顶部 tab -->
    <div class="tab-nav">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-btn', { active: currentTab === tab.id, disabled: tab.disabled }]"
        @click="!tab.disabled && (currentTab = tab.id)"
        :disabled="tab.disabled"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="airdrop-content">
      <h2>AIRDROP</h2>
      <p class="description">The physical items will be sent to you by express delivery</p>

      <!-- 状态指示器 -->
      <div class="status-bar">
        <div 
          class="status-item" 
          :class="{ confirmed: isWalletReady }"
          @click="!isWalletReady && handleToAdd('wallet')"
        >
          <span>Wallet</span>
          <span :class="{ 'to-add': !isWalletReady }">
            {{ isWalletReady ? 'Confirmed' : 'To Add' }}
          </span>
        </div>
        <div 
          class="status-item" 
          :class="{ confirmed: isSocialReady }"
          @click="!isSocialReady && handleToAdd('social')"
        >
          <span>Social Media</span>
          <span :class="{ 'to-add': !isSocialReady }">
            {{ isSocialReady ? 'Confirmed' : 'To Add' }}
          </span>
        </div>
        <div 
          class="status-item" 
          :class="{ confirmed: isCexReady }"
          @click="!isCexReady && handleToAdd('cex')"
        >
          <span>CEX ID</span>
          <span :class="{ 'to-add': !isCexReady }">
            {{ isCexReady ? 'Confirmed' : 'To Add' }}
          </span>
        </div>
        <div 
          class="status-item" 
          :class="{ confirmed: isAddressReady }"
          @click="!isAddressReady && handleToAdd('address')"
        >
          <span>Address</span>
          <span :class="{ 'to-add': !isAddressReady }">
            {{ isAddressReady ? 'Confirmed' : 'To Add' }}
          </span>
        </div>
      </div>

      <!-- 空投列表 -->
      <div class="airdrop-list">
        <div class="airdrop-item">
          <div class="product-wrapper">
            <img :src="airdrops[0].image" :alt="airdrops[0].name" class="product-image">
            <div class="product-info">
              <h3>{{ airdrops[0].name }}</h3>
              <div class="specs">
                <div class="spec-item">
                  <span>Color</span>
                  <span>{{ airdrops[0].color }}</span>
                </div>
                <div class="spec-item">
                  <span>Size</span>
                  <span>{{ airdrops[0].size }}</span>
                </div>
                <div class="spec-item">
                  <span>Quantity</span>
                  <span>{{ airdrops[0].quantity }}</span>
                </div>
              </div>
              <button 
                v-if="!airdrops[0].claimed" 
                class="claim-btn"
                :disabled="!canClaim"
                @click="handleClaim(airdrops[0])"
              >
                Claim
              </button>
              <span v-else class="received-text">Received</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 确认弹窗 -->
    <div v-if="showConfirmModal" class="modal-overlay" @click="showConfirmModal = false">
      <div class="modal-content" @click.stop>
        <h3>Confirm Claim</h3>
        <p>Are you sure you want to claim this airdrop?</p>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showConfirmModal = false">Cancel</button>
          <button class="confirm-btn" @click="confirmClaim">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = [
  { id: 'tee', name: 'METAQUIRK TEE', disabled: false },
  { id: 'coming', name: 'COMING SOON', disabled: true }
]

const currentTab = ref('tee')
const showConfirmModal = ref(false)
const selectedAirdrop = ref(null)

// 模拟数据
const airdrops = ref([
  {
    id: 1,
    name: 'MetaQuirk Tee',
    image: '/images/tee01.png',
    color: 'Black',
    size: 'M',
    quantity: 1,
    claimed: false
  }
])

// 检查各项条件是否满足
const isWalletReady = ref(true)
const isSocialReady = ref(false)
const isCexReady = ref(false)
const isAddressReady = ref(true)

// 计算是否可以领取
const canClaim = computed(() => {
  return isWalletReady.value && 
         isSocialReady.value && 
         isCexReady.value && 
         isAddressReady.value
})

// 处理领取点击
const handleClaim = (airdrop) => {
  if (!canClaim.value) return
  selectedAirdrop.value = airdrop
  showConfirmModal.value = true
}

// 确认领取
const confirmClaim = () => {
  if (selectedAirdrop.value) {
    selectedAirdrop.value.claimed = true
  }
  showConfirmModal.value = false
}

// 处理 To Add 点击事件
const handleToAdd = (type) => {
  switch(type) {
    case 'wallet':
      router.push({ path: '/info', query: { tab: 'wallet' }})
      break
    case 'social':
      router.push({ path: '/info', query: { tab: 'social' }})
      break
    case 'cex':
      router.push({ path: '/info', query: { tab: 'cex' }})
      break
    case 'address':
      router.push({ path: '/info', query: { tab: 'address' }})
      break
  }
}
</script>

<style lang="scss" scoped>
.airdrop-page {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
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
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;

  &:hover:not(.disabled), &.active:not(.disabled) {
    background: rgba(255,255,255,0.1);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

.airdrop-content {
  background: rgba(17, 17, 17, 0.95);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255,255,255,0.1);

  h2 {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .description {
    color: rgba(255,255,255,0.6);
    margin-bottom: 32px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    width: auto;
    margin: 0 8px;
  }
}

.status-bar {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  .status-item {
    flex: 1;
    min-width: 200px;
    padding: 12px 24px;
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;

    &.confirmed {
      border-color: #4CAF50;
      color: #4CAF50;
    }

    &:not(.confirmed):hover {
      background: rgba(255,255,255,0.05);
    }

    .to-add {
      color: #FFC107;
      text-decoration: underline;
    }

    &.confirmed {
      cursor: default;
    }
  }

  @media (max-width: 768px) {
    margin: 0 -8px;
    padding: 0 8px;
  }
}

.airdrop-list {
  display: flex;
  justify-content: center;
  padding: 20px 0;

  .airdrop-item {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 32px 24px;
    
    .product-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }

    .product-image {
      width: 280px;
      height: 280px;
      object-fit: contain;
      background: #fff;
      border-radius: 16px;
    }

    .product-info {
      width: 100%;
      max-width: 360px;
      text-align: center;

      h3 {
        font-size: 24px;
        margin-bottom: 24px;
      }

      .specs {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 32px;

        .spec-item {
          display: flex;
          justify-content: space-between;
          color: rgba(255,255,255,0.6);
          padding: 0 20px;
        }
      }

      .claim-btn {
        max-width: 200px;
        margin: 0 auto;
      }
    }
  }
}

.claim-btn {
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  background: rgba(255, 193, 7, 0.1);
  color: #FFC107;
  border: 1px solid #FFC107;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;

  &:hover:not(:disabled) {
    background: rgba(255, 193, 7, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.received-text {
  display: block;
  text-align: center;
  color: rgba(255,255,255,0.6);
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
    font-size: 20px;
    margin-bottom: 16px;
  }

  p {
    color: rgba(255,255,255,0.6);
    margin-bottom: 24px;
  }

  .modal-actions {
    display: flex;
    gap: 16px;

    button {
      flex: 1;
      padding: 12px;
      border-radius: 15px;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s;

      &.cancel-btn {
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        color: #fff;

        &:hover {
          background: rgba(255,255,255,0.1);
        }
      }

      &.confirm-btn {
        background: rgba(255, 193, 7, 0.1);
        border: 1px solid #FFC107;
        color: #FFC107;

        &:hover {
          background: rgba(255, 193, 7, 0.2);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .airdrop-content {
    padding: 20px;
  }

  .status-bar {
    gap: 16px;
    
    .status-item {
      min-width: 100%;
    }
  }

  .airdrop-list {
    .airdrop-item {
      padding: 24px 20px;
      
      .product-image {
        width: 220px;
        height: 220px;
        border-radius: 14px;
      }
    }
  }
}

@media (max-width: 480px) {
  .airdrop-list {
    .airdrop-item {
      padding: 16px;
      border-radius: 20px;
      
      .product-image {
        width: 180px;
        height: 180px;
        border-radius: 12px;
      }
    }
  }
}
</style> 