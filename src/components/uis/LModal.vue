<template>
    <teleport to="#modals">
        <div
            v-if="data.show"
            class="modal__container"
            :class="[variant ? 'modal-' + variant : '']"
            v-on="events"
        >
            <div
                :id="id"
                class="modal__bg"
                :class="$props.class"
                @click="hide"
            >
                <div
                    class="modal"
                    @click="$event.stopPropagation();"
                >
                    <div
                        class="modal__wrapper"
                        :style="{ width: width +'px', height: height +'px' }"
                    >
                        <div
                            v-if="header"
                            ref="modalHeader"
                            class="modal__header"
                        >
                            <slot name="modal-header">
                                <div class="modal__header__title">
                                    <span v-if="header.length > 0">{{ header }}</span>
                                </div>
                                <div class="modal__header__closebtn">
                                    <l-button
                                        id="files_manager_btn_close"
                                        icon="close"
                                        @click="hide"
                                    />
                                </div>
                            </slot>
                        </div>
                        <div class="modal__content">
                            <div class="modal__content--main">
                                <slot />
                            </div>
                        </div>
                        <div
                            v-if="footer"
                            ref="modalFooter"
                            class="modal__footer"
                        >
                            <slot name="modal-footer">
                                <span v-if="footer.length > 0">{{ footer }}</span>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { ref, reactive } from 'vue';
import layoutProps from './common/layoutProps';
import transfer   from './common/transferData';

export default{
    props:{
        ...layoutProps, 
        ...{ 
            header: {
                type: String,
                required: true,
            },
            footer: {
                type: String,
                default: true,
            },
            icon: {
                type: Boolean,
                default: false,
            },
            width: {
                type: String,
                default: '500',
            },
            height: {
                type: String,
                default: '500',
            },
        }
    },

    setup(props , { emit }) {
        const events     = { click: 'click' }
        const data       = reactive({
            show: false,
        })
        const show       = function(){
            data.show = true;
        }
        const hide       = function(){
            data.show = false;
        }

        transfer.setupEvents(events, emit);

        return {events, data, show, hide }
    }
}
</script>

<style>
.modal__header {
  max-height: 45px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 9px 16px;
  display: flex;
  justify-content: space-between;
}

.modal {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  /*margin-top: 8px;*/
  -webkit-box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.5);
  z-index: 10001;
  display: inline-block;
}

.modal__tool__closebtn button {
  background-color: rgba(0, 0, 0, 0.75);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 100px;
  width: 36px;
  height: 36px;
  margin-right: 0;
}

.modal__tool__closebtn button svg {
  stroke: #fff;
}

.modal__tool__closebtn button:hover {
  background-color: #fff;
}

.modal__tool__closebtn button:hover svg {
  stroke: #000;
}

.modal__bg {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(72, 56, 56, 0.85);
  z-index: 10000;
  height: 100vh;
  overflow: auto;
  overflow-y: overlay;
}

.modal__container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 100vh;
  overflow: auto;
  overflow-y: overlay;
}

.modal__wrapper {
  height: 100%;
  border-radius: 8px;
  position: relative;
  display: inline-block;
}

.modal__header {
  background-color: rgba(0, 0, 0, 0.05);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 5px 12px;
}

.modal__header__title {
  font-size: 18px;
  font-weight: bold;
}

.modal__header__closebtn {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-right: 0;
}

.modal__header__closebtn button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 100px;
  background: transparent;
  width: 32px;
  height: 32px;
  margin-right: 0;
}

.modal__header__closebtn button:hover {
  background-color: #fff;
}

.modal__content {
  padding: 20px;
}

.modal__footer {
  /*max-height: 80px;*/
  overflow-y: scroll;
  position: absolute;
  bottom: 0;
  background: #eee;
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 5px;
  /*height: 45px;*/
}

.modal__content .modal__content--main {
  height: 100%;
  overflow-y: scroll;
}

.modal.modal--img {
  width: auto;
  margin-top: 0;
  border-radius: 12px;
}

.modal.modal--img .modal__content {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
}

.modal.modal--img .modal__content img {
  display: block;
  width: 100%;
  height: auto;
}

.modal .modalmess {
  text-align: center;
  font-size: 13px;
  margin: 29px 0 53px;
}

.modal .modalmess span.username {
  font-weight: bold;
}

.modal .formlist__btn {
  margin-top: 30px;
  margin-bottom: 5px;
}

.modal .formlist__btn .btn {
  padding: 9px 10px;
}
</style>
