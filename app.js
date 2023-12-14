let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const timeline = new TimelineMax();

//parameter1: target element
//parameter2: duration
//parameter3: 控制對象的原始狀態
//parameter4: 控制對象的動畫結束後的狀態
//parameter5: 動畫的速度曲線
// timeline
// .fromTo(hero, 1, {height: "0%" }, {height: "100%", ease: Power2.easeInOut })
// .fromTo(hero, 1.2, {width: "80%" }, {width: "100%", ease: Power2.easeInOut })
// .fromTo(slider, 1, {x: "-100%" }, {x: "0%", ease: Power2.easeInOut }, "-=1.2")
// .fromTo(animation, 0.3, {opacity:1 }, {opacity:0 })

// window.setTimeout(()=>{
//     animation.style.pointerEvents = "none";
// },2500)  //2500後animation的pointerEvents會變成none，滑鼠點擊才會有反應


//讓整個網站的ENTER KEY都無法使用
window.addEventListener("keypress",(e)=>{
    if(e.key == "Enter"){
        e.preventDefault();
    }
});

//防止FORM內部的BUTTON交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        e.preventDefault();
    });
});

//選擇select內部的option之後，會改變select的顏色
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select)=>{
    select.addEventListener("change", (e)=>{
        setGPA();
        changeColor(e.target) //e.target就是<select>
    });
});

//改變credits之後，GPA也會改變
let credits = document.querySelectorAll(".class-credit");
credits.forEach( (credit)=>{
    credit.addEventListener("change", (e)=>{
        setGPA();
    });
});

//改變Score後，推薦也改變
let score = document.querySelectorAll(".Score");
let classname = document.querySelectorAll(".class-type");
score.forEach( (score)=>{
    score.addEventListener("change", (e)=>{
        //console.log(typeof parseInt(score.value));
        setRecommend(classname);
    });
});

function changeColor(target) {
    if (target.value == "A+" || target.value == "A-" || target.value == "A") {
      target.style.backgroundColor = "lightgreen";
      target.style.color = "black";
    } else if (
      target.value == "B" ||
      target.value == "B-" ||
      target.value == "B+"
    ) {
      target.style.backgroundColor = "yellow";
      target.style.color = "black";
    } else if (
      target.value == "C" ||
      target.value == "C-" ||
      target.value == "C+"
    ) {
      target.style.backgroundColor = "orange";
      target.style.color = "black";
    } else if (
      target.value == "D"
    ) {
      target.style.backgroundColor = "red";
      target.style.color = "black";
    } else if (target.value == "E") {
      target.style.backgroundColor = "grey";
      target.style.color = "white";
    } else {
      target.style.backgroundColor = "white";
    }
}

function convertor(grade) {
    switch (grade) {
      case "A+":
        return 4.3;
      case "A":
        return 4;
        case "A-":
        return 3.7;
      case "B+":
        return 3.3;
      case "B":
        return 3; 
      case "B-":
        return 2.7;
      case "C+":
        return 2.3;
      case "C":
        return 2.0;
      case "C-":
        return 1.7;
      case "D":
        return 1.0;
      case "E":
        return 0.0;
      default:
        return 0;
    }
}

function setGPA(){
    let formLength = document.querySelectorAll("form").length;
    let credits = document.querySelectorAll(".class-credit");
    let selects = document.querySelectorAll("select");
    let score = document.querySelectorAll(".Score");
    let sum=0; //GPA計算用分子
    let creditSum=0; //GPA計算用分母

    for(let i=0;i<credits.length;i++){
        //console.log(credits[i]);
        if(!isNaN(credits[i].valueAsNumber)){
            creditSum += credits[i].valueAsNumber;
        }
    }

    for(let i=0;i<formLength;i++){
        if(!isNaN(credits[i].valueAsNumber)){
            sum += (credits[i].valueAsNumber * convertor(selects[i].value));
        }
    }
    
    //console.log("sum is " + sum);
    //console.log("creditSum is " + creditSum);

    let result;
    if(creditSum == 0){
        result=(0.0).toFixed(2);
    }else{
        result = (sum / creditSum).toFixed(2);
    }
    document.getElementById("result-gpa").innerText = result;
}

let weightage = {
"線性代數": {
        CS: 5,
        DSP: 4,
        RF: 3,
        ICS: 3,
        BigE: 3,
        SmallE: 3,
        commsys: 5,
        commnetwork: 4,
  },

  "邏輯設計": {
      CS: 2,
      DSP: 3,
      RF: 4,
      ICS: 5,
      BigE: 2,
      SmallE: 2,
      commsys: 3,
      commnetwork: 2,
  },

  "邏輯設計實驗": {
    CS: 2,
    DSP: 3,
    RF: 4,
    ICS: 5,
    BigE: 2,
    SmallE: 2,
    commsys: 3,
    commnetwork: 3,
  },

  "程式設計": {
    CS: 5,
    DSP: 3,
    RF: 2,
    ICS: 2,
    BigE: 1,
    SmallE: 1,
    commsys: 2,
    commnetwork: 4,
  },

  "程式設計實習": {
    CS: 5,
    DSP: 3,
    RF: 2,
    ICS: 2,
    BigE: 1,
    SmallE: 1,
    commsys: 2,
    commnetwork: 4,
  },

  "計算機概論": {
    CS: 5,
    DSP: 2,
    RF: 2,
    ICS: 3,
    BigE: 1,
    SmallE: 1,
    commsys: 4,
    commnetwork: 4,
  },
};

function setRecommend(classname){
    let CS=0;  //計算機組
    let DSP=0;//信號與智慧計算
    let RF=0;//電磁晶片
    let ICS=0;//晶片系統
    let BigE=0;//大電力
    let SmallE=0;//小電力
    let commsys=0;//通訊系統
    let commnetwork =0;//通訊網路

      let scores = [
        { name: 'CS', score: 0 },
        { name: 'DSP', score: 0 },
        { name: 'RF', score: 0 },
        { name: 'ICS', score: 0 },
        { name: 'BigE', score: 0 },
        { name: 'SmallE', score: 0 },
        { name: 'commsys', score: 0 },
        { name: 'commnetwork', score: 0 }
      ];
  // if(classname[0].value=="線性代數"){
  //   console.log("hah i am a 線性代數");
  // }

  if(classname.length ==8){
      let formLength = document.querySelectorAll("form").length;
      let credits = document.querySelectorAll(".class-credit");
      let selects = document.querySelectorAll("select");
      let score = document.querySelectorAll(".Score");
      
      for(let i = 0; i < classname.length; i++){
        //console.log(classname[i].value);
        let course = classname[i].value;
        let courseWeightage = weightage[course]; //獲取該課程的權重
        console.log(courseWeightage);
        let parsedScore = parseInt(score[i].value);
        if(courseWeightage){
          // 對每個組別對應的權重乘以分數，並加總
          CS += (courseWeightage.CS || 0) * parsedScore;
          DSP += (courseWeightage.DSP || 0) * parsedScore;
          RF += (courseWeightage.RF || 0) * parsedScore;
          ICS += (courseWeightage.ICS || 0) * parsedScore;
          BigE += (courseWeightage.BigE || 0) * parsedScore;
          SmallE += (courseWeightage.SmallE || 0) * parsedScore;
          commsys += (courseWeightage.commsys || 0) * parsedScore;
          commnetwork += (courseWeightage.commnetwork || 0) * parsedScore;
        }
        //console.log("CS is " + CS);
      }
        // 將每個組別的分數存入陣列
        scores = [
          { name: 'CS', score: CS },
          { name: 'DSP', score: DSP },
          { name: 'RF', score: RF },
          { name: 'ICS', score: ICS },
          { name: 'BigE', score: BigE },
          { name: 'SmallE', score: SmallE },
          { name: 'commsys', score: commsys },
          { name: 'commnetwork', score: commnetwork }
        ];
        //對分數排序
        scores.sort((a, b) => b.score - a.score);

        // 選出前三名
        let topThree = scores.slice(0, 3);
        console.log('Top three groups:', topThree);
        console.log(typeof topThree[0].name);
        
        let topThreeNames = topThree.map(item => item.name).join(', ');
        document.getElementById("result-group").innerText = topThreeNames;
        //document.getElementById("result-group").innerText = topThree[0].name;

        // scores = { CS, DSP, RF, ICS, BigE, SmallE, commsys, commnetwork };
        // //找到具有最大分數的組別
        // let maxScore = -Infinity;
        // let maxGroup = '';
        // for (const group in scores) {
        //     if (scores[group] > maxScore) {
        //         maxScore = scores[group];
        //         maxGroup = group;
        //     }
        // }
        //console.log('Group with max score:', maxGroup);

  }
}

let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", (e)=> {
    let newForm = document.createElement("form");
    let newDiv = document.createElement("div");
    newDiv.classList.add("grader");

    //製作五個小元素 div裡面的東東
    let newInput1 = document.createElement("input");
    newInput1.setAttribute("type","text");
    newInput1.setAttribute("list","opt");
    newInput1.classList.add("class-type");

    let newInput2 = document.createElement("input");
    newInput2.setAttribute("type","number");
    newInput2.classList.add("Score");

    let newInput3 = document.createElement("input");
    newInput3.setAttribute("type","number");
    newInput3.setAttribute("min","0");
    newInput3.setAttribute("max","6");
    newInput3.classList.add("class-credit");
    newInput3.addEventListener("change", (e)=>{
        setGPA();
    });

    // here is the select tag
    let newSelect = document.createElement("select");
    newSelect.classList.add("select");
    var opt1 = document.createElement("option");
    opt1.setAttribute("value", "");
    let textNode1 = document.createTextNode("");
    opt1.appendChild(textNode1);
    var opt2 = document.createElement("option");
    opt2.setAttribute("value", "A");
    let textNode2 = document.createTextNode("A");
    opt2.appendChild(textNode2);
    var opt3 = document.createElement("option");
    opt3.setAttribute("value", "A-");
    let textNode3 = document.createTextNode("A-");
    opt3.appendChild(textNode3);
    var opt4 = document.createElement("option");
    opt4.setAttribute("value", "B+");
    let textNode4 = document.createTextNode("B+");
    opt4.appendChild(textNode4);
    var opt5 = document.createElement("option");
    opt5.setAttribute("value", "B");
    let textNode5 = document.createTextNode("B");
    opt5.appendChild(textNode5);
    var opt6 = document.createElement("option");
    opt6.setAttribute("value", "B-");
    let textNode6 = document.createTextNode("B-");
    opt6.appendChild(textNode6);
    var opt7 = document.createElement("option");
    opt7.setAttribute("value", "C+");
    let textNode7 = document.createTextNode("C+");
    opt7.appendChild(textNode7);
    var opt8 = document.createElement("option");
    opt8.setAttribute("value", "C");
    let textNode8 = document.createTextNode("C");
    opt8.appendChild(textNode8);
    var opt9 = document.createElement("option");
    opt9.setAttribute("value", "C-");
    let textNode9 = document.createTextNode("C-");
    opt9.appendChild(textNode9);
    var opt10 = document.createElement("option");
    opt10.setAttribute("value", "D+");
    let textNode10 = document.createTextNode("D+");
    opt10.appendChild(textNode10);
    var opt11 = document.createElement("option");
    opt11.setAttribute("value", "D");
    let textNode11 = document.createTextNode("D");
    opt11.appendChild(textNode11);
    var opt12 = document.createElement("option");
    opt12.setAttribute("value", "D-");
    let textNode12 = document.createTextNode("D-");
    opt12.appendChild(textNode12);
    var opt13 = document.createElement("option");
    opt13.setAttribute("value", "F");
    let textNode13 = document.createTextNode("F");
    opt13.appendChild(textNode13);

    newSelect.appendChild(opt1);
    newSelect.appendChild(opt2);
    newSelect.appendChild(opt3);
    newSelect.appendChild(opt4);
    newSelect.appendChild(opt5);
    newSelect.appendChild(opt6);
    newSelect.appendChild(opt7);
    newSelect.appendChild(opt8);
    newSelect.appendChild(opt9);
    newSelect.appendChild(opt10);
    newSelect.appendChild(opt11);
    newSelect.appendChild(opt12);
    newSelect.appendChild(opt13);

    newSelect.addEventListener("change", (e)=>{
        setGPA();
        changeColor(e.target);
    });

    //-----------------------------

    //垃圾桶
    let newButton = document.createElement("button");
    newButton.classList.add("trash-button");
    let newItag = document.createElement("i");
    newItag.classList.add("fas");
    newItag.classList.add("fa-trash"); 

    newButton.appendChild(newItag);

    newButton.addEventListener("click",(e)=>{
        e.preventDefault();
        e.target.parentElement.parentElement.style.animation = "scaleDown 0.3s ease forwards";
        e.target.parentElement.parentElement.addEventListener("animationend", (e)=>{
            e.target.remove();
            setGPA();
        });
    });
    //-----------------------------

    newDiv.appendChild(newInput1);
    newDiv.appendChild(newInput2);
    newDiv.appendChild(newInput3);
    newDiv.appendChild(newSelect);
    newDiv.appendChild(newButton);

    newForm.appendChild(newDiv);
    document.querySelector(".all-inputs").appendChild(newForm);
    newForm.style.animation = "scaleUp 0.5s ease forwards";
    
});

let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach(trash =>{
    trash.addEventListener("click", (e)=>{
        e.target.parentElement.parentElement.classList.add("remove");
    });
});

allTrash.forEach(trash =>{
    let form = trash.parentElement.parentElement;
    form.addEventListener("transitionend", (e)=>{
        form.remove();
        setGPA();        //刪除之後要重新計算GPA
    });
});
