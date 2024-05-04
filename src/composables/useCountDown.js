//封装倒计时逻辑函数

import {ref,computed,onUnmounted} from "vue";
import dayjs from 'dayjs'

export const useCountDown = ()=>{
  //1.响应式数据
  let timer = null
  const time = ref(0)
  const formatTime = computed(()=>{
    return dayjs.unix(time.value).format('mm分ss秒')
  })

  //2.开启倒计时函数
  const start = (currentTime)=>{
    time.value = currentTime
    timer = setInterval(()=>{
      if (time.value>0) {
        time.value--
      }else {
        clearInterval(timer)
      }
    },1000)

  }
  //组件销毁时清除定时器
  onUnmounted(()=>{
    timer && clearInterval(timer)
  })
  return{
    formatTime,
    start
  }
}