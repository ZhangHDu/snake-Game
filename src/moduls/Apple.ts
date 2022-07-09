class Apple {
    // 定义属性表示苹果对应的元素
   element:HTMLElement;
   constructor(){
       this.element = document.querySelector('.apple')!
   }
   // 获取苹果x轴坐标
   get x(){
       return this.element.offsetLeft
   }
   // 获取苹果y轴坐标
   get y(){
       return this.element.offsetTop
   }
   // 修改苹果位置
   change(){
        // 范围为0-290px
        // 并且为10的倍数(0-29的整数乘10即可)
        this.element.style.left = Math.round(Math.random()*29)*10+"px"
        this.element.style.top = Math.round(Math.random()*29)*10+"px"
   }
}

export default Apple