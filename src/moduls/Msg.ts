class Msg{
    // 记录分数和等级
    score = 0;
    level = 1;
    scoreEle : HTMLElement;
    levelEle : HTMLElement;
    // 设置最大等级
    maxLevel:number
    // 设置变量表示多少分升一级
    upScore:number
    constructor(maxLevel:number = 10,upScore:number = 10){
        this.scoreEle = document.querySelector('.score')!
        this.levelEle = document.querySelector('.level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    // 设置一个加分的方法
    addScore(){
        this.scoreEle.innerHTML = ++this.score +""
        // 每10分加一级难度
        if(this.score % this.upScore === 0){
            this.levelUp()
        }
    }
    // 等级提升方法
    levelUp(){
        if(this.level<this.maxLevel){
            this.levelEle.innerHTML = ++this.level +""
        }
        
    }
}

export default Msg
