<template>
  <div class="home-page">
    <!-- 欢迎卡片 -->
    <div class="welcome-card card-container">
      <div class="user-info">
        <div class="avatar">
          <img src="/images/avatar.svg" alt="M" />
        </div>
        <div class="welcome-text">
          <h1>Welcome</h1>
          <div class="wallet-info">
            <span class="wallet-address">0xqrq...69C834</span>
            <button class="logout-btn" @click="showLogoutModal = true">
              <img src="/images/icon-logout.svg" alt="logout" />
            </button>
          </div>
        </div>
      </div>
      
      <div class="airdrop-notice">
        <div class="product-image-container">
          <img src="/images/tshirt.png" alt="T-Shirt" class="product-image" />
        </div>
        <div class="notice-content">
          <div class="notice-text">
            <p>You have new airdrops</p>
            <p>that have not been claimed</p>
          </div>
          <button class="primary-btn compact" @click="goToAirdrop">Claim</button>
        </div>
      </div>
    </div>

    <!-- 信息卡片 -->
    <div class="info-cards">
      <!-- INFO 卡片 -->
      <div class="info-card card-container">
        <div class="card-header">
          <h2>INFO</h2>
        </div>
        <div class="info-list">
          <div class="info-header">
            <span>Binding</span>
            <span>Quantity</span>
          </div>
          <div class="info-item">
            <span>WALLET</span>
            <span>To Add</span>
          </div>
          <div class="info-item">
            <span>SOCIAL MEDIA</span>
            <span>01</span>
          </div>
          <div class="info-item">
            <span>CEX ID</span>
            <span>02</span>
          </div>
          <div class="info-item">
            <span>ADDRESS</span>
            <span>Added</span>
          </div>
        </div>
      </div>

      <!-- AIRDROP 卡片 -->
      <div class="info-card card-container" ref="airdropSection">
        <div class="card-header">
          <h2>AIRDROP</h2>
        </div>
        <div class="airdrop-list">
          <div class="airdrop-header">
            <span>Name</span>
            <span>time</span>
            <span>State</span>
          </div>
          <div class="airdrop-item">
            <span>MetaQuirk Genesis</span>
            <span>2024-11-29</span>
            <span class="state received">Received</span>
          </div>
          <div class="airdrop-item">
            <span>MetaQuirk Genesis</span>
            <span>-</span>
            <span class="state not-received">Not Received</span>
          </div>
          <div class="airdrop-item">
            <span>MetaQuirk Genesis</span>
            <span>-</span>
            <span class="state not-received">Not Received</span>
          </div>
          <div class="airdrop-item">
            <span>MetaQuirk Genesis</span>
            <span>-</span>
            <span class="state not-received">Not Received</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 退出确认弹窗 -->
    <div v-if="showLogoutModal" class="modal-overlay" @click="showLogoutModal = false">
      <div class="modal-content" @click.stop>
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showLogoutModal = false">Cancel</button>
          <button class="confirm-btn" @click="handleLogout">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogoutModal: false
    }
  },
  methods: {
    goToAirdrop() {
      this.$router.push('/airdrop');
    },
    handleLogout() {
      // 这里处理退登录逻辑
      this.$router.push('/login');
      this.showLogoutModal = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-container {
  background: rgba(22, 22, 22, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  padding: 40px;
}

.card-header {
  margin-bottom: 24px;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
  }
}

.welcome-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  padding: 40px 40px !important;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px !important;
}

.avatar {
  width: 44px !important;
  height: 44px !important;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 18px;
    height: 18px;
  }
}

.airdrop-notice {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 32px 40px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 120px;
}

.primary-btn {
  padding: 8px 24px;
  border-radius: 20px;
  background: linear-gradient(180deg, #333 0%, #222 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  
  &.compact {
    padding: 8px 16px;
    min-width: 80px;
  }

  &:hover {
    background: linear-gradient(180deg, #444 0%, #333 100%);
  }
}

.info-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info-list {
  display: flex;
  flex-direction: column;
  
  .info-header {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding-bottom: 16px;
    color: rgba(255,255,255,0.6);
    font-size: 14px;
  }

  .info-item {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 12px 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    font-size: 14px;

    span {
      color: rgba(255,255,255,0.9);
    }
  }
}

.airdrop-list {
  .airdrop-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    padding-bottom: 16px;
    color: rgba(255,255,255,0.6);
    font-size: 14px;
  }

  .airdrop-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    padding: 12px 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    font-size: 14px;

    .state {
      &.received {
        color: #4CAF50;
      }

      &.not-received {
        color: #999;
      }
    }
  }
}

.product-image-container {
  padding: 12px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
}

.notice-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .notice-text {
    p {
      font-size: 14px;
      line-height: 1.4;
      margin: 0;
      color: rgba(255, 255, 255, 0.9);
      
      &:first-child {
        margin-bottom: 2px;
      }
    }
  }
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 8px;

  .wallet-address {
    color: rgba(255,255,255,0.6);
    font-size: 14px;
  }

  .logout-btn {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }

    img {
      width: 16px;
      height: 16px;
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
  background: rgba(22, 22, 22, 0.95);
  border-radius: 24px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  border: 1px solid rgba(255,255,255,0.1);

  h3 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  p {
    color: rgba(255,255,255,0.6);
    margin-bottom: 32px;
    font-size: 16px;
  }

  .modal-actions {
    display: flex;
    gap: 16px;

    button {
      flex: 1;
      padding: 12px;
      border-radius: 20px;
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
        background: rgba(255, 59, 48, 0.1);
        border: 1px solid #ff3b30;
        color: #ff3b30;

        &:hover {
          background: rgba(255, 59, 48, 0.2);
        }
      }
    }
  }
}

// 修改响应式布局
@media (max-width: 1024px) {
  .welcome-card {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
    
    .user-info {
      width: 100%;
      align-items: flex-start;
    }
    
    .airdrop-notice {
      width: 100%;
      padding: 24px 32px;
      min-height: 100px;
    }
  }

  .info-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card-container {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .welcome-card {
    .user-info {
      width: 100%;
      align-items: flex-start;
      
      .welcome-text {
        h1 {
          text-align: left;
        }
        
        .wallet-address {
          text-align: left;
        }
      }
    }
  }

  .airdrop-notice {
    padding: 16px;
    
    .notice-content {
      text-align: left;
      
      .notice-text {
        p {
          font-size: 13px;
          text-align: left;
        }
      }
    }
  }

  .modal-content {
    padding: 24px;
    
    h3 {
      font-size: 20px;
    }
    
    p {
      font-size: 14px;
      margin-bottom: 24px;
    }
    
    .modal-actions button {
      font-size: 14px;
      padding: 10px;
    }
  }
}

@media (max-width: 480px) {
  .card-container {
    padding: 20px;
  }

  .airdrop-notice {
    padding: 20px;
    gap: 20px;
    
    .product-image-container {
      padding: 8px;
    }

    .product-image {
      width: 60px;
      height: 60px;
    }

    .notice-content {
      .notice-text {
        p {
          font-size: 12px;
        }
      }
    }
  }
}

.user-info {
  .welcome-text {
    h1 {
      font-size: 32px !important;
      text-transform: uppercase !important;
      margin-bottom: 8px;
    }
  }

  .wallet-info {
    .wallet-address {
      font-size: 16px !important;
      color: rgba(255,255,255,0.6);
    }
  }
}
</style> 