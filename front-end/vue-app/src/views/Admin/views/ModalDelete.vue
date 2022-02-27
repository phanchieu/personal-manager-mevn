<template>
  <section id="modal-delete">
    <!-- Modal delete -->
    <div id="toast">
      <div
        ref="toast"
        class="toast"
        :class="{ 'toast--success': toastType == 'success', 'toast--error': toastType == 'error' }"
      >
        <div class="toast__icon">
          <i v-if="toastType == 'success'" class="fas fa-check-circle"></i>
          <i v-else class="fas fa-times-circle"></i>
        </div>
        <div class="toast__body">
          <h3 class="toast__title">{{ toastType }}</h3>
          <p class="toast__msg">{{ toastMsg }}</p>
        </div>
        <div ref="toastClose" class="toast__close" @click="removeToast">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>

    <section class="modal-wrapper" v-show="modalDeleteUser">
      <div class="overlay" @click="handleToggleModal"></div>

      <div class="modal__wrapper-box">
        <span class="box__body-icon">
          <i class="fas fa-times"></i>
        </span>
        <span class="box__body-close" @click="handleToggleModal">
          <i class="fas fa-times"></i>
        </span>
        <div class="box__body-content">
          <h3>Are you sure?</h3>
          <div class="content__wrapper">
            <p>Do you really want to delete these records? This process cannot be undone!</p>
          </div>
        </div>
        <div class="box__body-footer">
          <button class="body-footer__cacel modal__btn" @click="handleToggleModal">Cancel</button>
          <button class="body-footer__delete modal__btn" @click="handleDelete">Delete</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import { deleteUser } from '@/apis/User.js';
  export default {
    name: 'ModalDelete',
    data() {
      return {
        modalDeleteUser: false,
        userId: null,
        toastMsg: null,
        toastType: null,
      };
    },
    methods: {
      handleToggleModal(userId) {
        this.userId = userId;
        this.modalDeleteUser = !this.modalDeleteUser;
      },

      handleDelete() {
        // Goi API Delete
        deleteUser(this.userId).then((response) => {
          // is error
          if (response.response?.status) {
            this.toastMsg = 'Delete Record Failed!';
            this.toastType = 'error';
          } else {
            this.toastMsg = 'Delete Record Successfully!';
            this.toastType = 'success';
            this.$root.$emit('users-changed');
          }

          this.modalDeleteUser = false;
          const toast = this.$refs.toast;
          toast.style.display = 'flex';
          setTimeout(() => (toast.style.display = 'none'), 4000);
        });
      },

      removeToast() {
        let toast = this.$refs.toast;
        toast.style.display = 'none';
      },
    },
  };
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /*Modal*/
  .modal-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
  }
  .overlay {
    padding-top: 26vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-around;
  }

  .modal__wrapper-box {
    width: 412px;
    height: 363px;
    background-color: #fff;
    border-radius: 7px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  .box__body-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 68px;
    height: 68px;
    position: absolute;
    top: 20%;
    right: 50%;
    transform: translate(50%, -50%);
    border-radius: 50%;
    border: 3px solid red;
  }

  .box__body-icon i {
    font-size: 30px;
    color: red;
  }

  .box__body-close {
    position: absolute;
    top: 14px;
    right: 14px;
    cursor: pointer;
  }
  .box__body-close:hover {
    color: rgba(76, 76, 76, 0.7);
  }
  .box__body-content {
    margin-top: 33%;
  }
  .box__body-content > h3 {
    font-size: 26px;
    letter-spacing: 1px;
    font-size: 300;
  }
  .content__wrapper {
    margin-top: 23px;
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .content__wrapper > p {
    font-size: 16px;
    color: rgba(76, 76, 76, 0.7);
    display: inline-block;
    width: 80%;
    line-height: 19px;
  }
  .box__body-content > p {
    margin-top: 10px;
  }
  .box__body-footer {
    margin-top: 45px;
    width: 100%;
  }
  .box__body-footer .modal__btn {
    outline: none;
    border: none;
    width: 120px;
    height: 38px;
    border-radius: 5px;
    margin-left: 15px;
    line-height: 38px;
    background-color: rgba(255, 0, 0, 0.78);
    color: #fff;
    font-weight: 200;
    font-size: 15px;
    cursor: pointer;
  }
  .box__body-footer .modal__btn:hover {
    background-color: rgba(255, 0, 0, 0.7);
  }
  .modal__btn.body-footer__cacel {
    background-color: rgba(76, 76, 76, 0.6);
  }
  .modal__btn.body-footer__cacel:hover {
    background-color: rgba(76, 76, 76, 0.5);
  }
  /*Toast success*/
  /* Toast Message */
  #toast {
    position: fixed;
    top: 80px;
    right: 32px;
    z-index: 9999999;
  }

  .toast {
    display: none;
    align-items: center;
    background-color: #fff;
    border-radius: 2px;
    padding: 20px 0;
    min-width: 400px;
    max-width: 450px;
    border-left: 4px solid;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.08);
    animation: slideInLeft 0.3s ease, fadeOut linear 1s 3s forwards;
    transition: all linear 0.3s;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(calc(100% + 32px));
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }

  .toast + .toast {
    margin-top: 24px;
  }

  .toast__icon {
    font-size: 24px;
  }

  .toast__icon,
  .toast__close {
    padding: 0 16px;
  }

  .toast__body {
    flex-grow: 1;
  }

  .toast__title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .toast__msg {
    font-size: 14px;
    color: #888;
    margin-top: 6px;
    line-height: 1.5;
  }

  .toast__close {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.3);
    padding: 0 16px;
    cursor: pointer;
  }

  .toast--success {
    border-color: #47d764;
  }

  .toast--success .toast__icon {
    color: #47d764;
  }
  .toast--error {
    border-color: #d32322;
  }
  .toast--error .toast__icon {
    color: #d32322;
  }

  .message__modal {
    text-align: center;
    position: fixed;
    line-height: 30px;
    top: 25px;
    right: -160px;
    width: 160px;
    height: 30px;
    color: #a5dc86;
    letter-spacing: 0.7px;
    font-size: 16px;
    background-color: #fff;
    box-shadow: 0.1px 0px 4px 0.1px rgb(0 0 0 / 4%);
    transition: right 0.4s ease-in;
    font-weight: 100;
    border-radius: 6px;
    z-index: 9999999999;
  }
  .btn-delete {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 18px;
    letter-spacing: 0.8px;
    color: #fff;
    font-weight: 100;
  }
  /*Create fas fas-times pro*/
  .box__body-icon__wrapper {
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
  }

  .icon__wrapper-times {
    display: block;
    height: 3px;
    width: 100%;
    background-color: red;
    transform: rotate(45deg);
  }
  .icon__wrapper-times > span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: red;
    transform: rotate(90deg);
  }
</style>
