let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const timeline = new TimelineMax();

// parameter1: target element
// parameter2: duration
// parameter3: 控制對象的原始狀態
// parameter4: 控制對象的動畫結束後的狀態
// parameter5: 動畫的速度曲線
timeline
.fromTo(hero, 1, {height: "0%" }, {height: "100%", ease: Power2.easeInOut })
.fromTo(hero, 1.2, {width: "80%" }, {width: "100%", ease: Power2.easeInOut })
.fromTo(slider, 1, {x: "-100%" }, {x: "0%", ease: Power2.easeInOut }, "-=1.2")
.fromTo(animation, 0.3, {opacity:1 }, {opacity:0 })

window.setTimeout(()=>{
    animation.style.pointerEvents = "none";
},2500)  //2500後animation的pointerEvents會變成none，滑鼠點擊才會有反應


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
        //setGPA();
        changeColor(e.target) //e.target就是<select>
    });
});

//改變credits之後，GPA也會改變
let credits = document.querySelectorAll(".class-credit");
credits.forEach( (credit)=>{
    credit.addEventListener("change", (e)=>{
        //setGPA();
    });
});

// //改變Score後，推薦也改變
// let score = document.querySelectorAll(".Score");
// let classname = document.querySelectorAll(".class-type");
// score.forEach( (score)=>{
//     score.addEventListener("change", (e)=>{
//       console.log("score",score);

//         //console.log(typeof parseInt(score.value));
//         setRecommend(classname);
//     });
// });

let calculateButton = document.getElementById('calculate-gpa');

calculateButton.addEventListener('click', function() {
  //確保year-section裡面的from裡面的元素量大於0
  let formLength = document.querySelectorAll(".year-section form").item(0).childElementCount+document.querySelectorAll(".year-section form").item(1).childElementCount;
  // console.log(formLength);
  if(formLength == 0){
    alert("請加入課程！");
    return;
  }
  let scores = document.querySelectorAll(".year-section .Score");
  let classname = document.querySelectorAll(".year-section .class-type");
  //檢查是否所有課程都有填寫
  let allCoursesEntered = Array.from(classname).every(course => course.value.trim() !== '');
  // 检查是否所有的分数输入框都有值
  let allScoresEntered = Array.from(scores).every(score => score.value.trim() !== '');
  //檢查所有學分是否都有填寫
  let allCreditsEntered = Array.from(credits).every(credit => credit.value.trim() !== '');
  if (!allCoursesEntered) {
      alert("請填寫所有課程！");
    }else if (!allScoresEntered) {
        alert("请填寫所有成績！");
    } else if(!allCreditsEntered){
        alert("請填寫所有學分！");
    }else{
      console.log("classname",classname);
      console.log("score",scores);
      setGPA();
      setRecommend(classname);
    }
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
  let firstYearCredits = document.querySelectorAll(".first-year-section .class-credit");
  let secondYearCredits = document.querySelectorAll(".second-year-section .class-credit");
  let credits = [...firstYearCredits, ...secondYearCredits];
  //let credits = document.querySelectorAll(".class-credit");
  let firstYearSelects = document.querySelectorAll(".first-year-section .select");
  let secondYearSelects = document.querySelectorAll(".second-year-section .select");
  let selects = [...firstYearSelects, ...secondYearSelects];
  //let selects = document.querySelectorAll("select");
  let score = document.querySelectorAll(".Score");
  let sum=0; //GPA計算用分子
  let creditSum=0; //GPA計算用分母

  for(let i=0;i<credits.length;i++){
      //console.log(credits[i]);
      if(!isNaN(credits[i].valueAsNumber)){
          creditSum += credits[i].valueAsNumber;
      }
      //console.log(creditSum);
  }

  for(let i=0;i<credits.length;i++){
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
  console.log(result);
  document.getElementById("result-gpa").innerText = result;
}

let weightage = {
"線性代數": {
        CS: 4,
        DSP: 4,
        RF: 3,
        ICS: 3,
        BigE: 3,
        SmallE: 3,
        CommSys: 5,
        CommNetwork: 4,
  },

  "邏輯設計": {
      CS: 2,
      DSP: 3,
      RF: 4,
      ICS: 5,
      BigE: 2,
      SmallE: 2,
      CommSys: 3,
      CommNetwork: 2,
  },

  "邏輯設計實驗": {
    CS: 1,
    DSP: 3,
    RF: 4,
    ICS: 5,
    BigE: 2,
    SmallE: 2,
    CommSys: 3,
    CommNetwork: 3,
  },

  "程式設計": {
    CS: 5,
    DSP: 3,
    RF: 2,
    ICS: 2,
    BigE: 1,
    SmallE: 1,
    CommSys: 2,
    CommNetwork: 4,
  },

  "程式設計實習": {
    CS: 5,
    DSP: 3,
    RF: 2,
    ICS: 2,
    BigE: 1,
    SmallE: 1,
    CommSys: 2,
    CommNetwork: 4,
  },

  "計算機概論": {
    CS: 5,
    DSP: 2,
    RF: 2,
    ICS: 3,
    BigE: 1,
    SmallE: 1,
    CommSys: 4,
    CommNetwork: 4,
  },

  "機率":{
    CS: 3,
    DSP: 4,
    RF: 3,
    ICS: 2,
    BigE: 4,
    SmallE: 4,
    CommSys: 6,
    CommNetwork: 5,
  },  

  "微分方程":{
    CS: 2,
    DSP: 6,
    RF: 2,
    ICS: 4,
    BigE: 5,
    SmallE: 5,
    CommSys: 6,
    CommNetwork: 3,
  }, 

  "電子學(一)":{
    CS: 2,
    DSP: 2,
    RF: 6,
    ICS: 6,
    BigE: 2,
    SmallE: 2,
    CommSys: 1,
    CommNetwork: 1,
  }, 

  "電子學(二)":{
    CS: 2,
    DSP: 2,
    RF: 6,
    ICS: 6,
    BigE: 2,
    SmallE: 2,
    CommSys: 1,
    CommNetwork: 1,
  }, 

  "電路學(一)":{
    CS: 1,
    DSP: 2,
    RF: 3,
    ICS: 5,
    BigE: 8,
    SmallE: 8,
    CommSys: 1,
    CommNetwork: 1,
  }, 

  "電路學(二)":{
    CS: 1,
    DSP: 2,
    RF: 3,
    ICS: 5,
    BigE: 8,
    SmallE: 8,
    CommSys: 1,
    CommNetwork: 1,
  }, 

  "電磁學(一)":{
    CS: 1,
    DSP: 1,
    RF: 8,
    ICS: 1,
    BigE: 2,
    SmallE: 2,
    CommSys: 1,
    CommNetwork: 1,
  }, 

  "訊號與系統":{
    CS: 1,
    DSP: 8,
    RF: 2,
    ICS: 2,
    BigE: 2,
    SmallE: 2,
    CommSys: 8,
    CommNetwork: 4,
  }, 

  "計算機組織":{
    CS: 5,
    DSP: 4,
    RF: 1,
    ICS: 5,
    BigE: 1,
    SmallE: 1,
    CommSys: 3,
    CommNetwork: 3,
  }, 

  "資料結構":{
    CS: 5,
    DSP:3,
    RF: 1,
    ICS: 2,
    BigE: 2,
    SmallE: 2,
    CommSys: 3,
    CommNetwork: 4,
  }, 
  
  "電工實驗(一)":{
    CS: 2,
    DSP: 1,
    RF: 6,
    ICS: 5,
    BigE: 2,
    SmallE: 2,
    CommSys: 2,
    CommNetwork: 2,
  }, 

  "電工實驗(二)":{
    CS: 2,
    DSP: 1,
    RF: 6,
    ICS: 5,
    BigE: 2,
    SmallE: 2,
    CommSys: 2,
    CommNetwork: 2,
  },

  "再生能源導論":{
    CS: 1,
    DSP: 1,
    RF: 1,
    ICS: 1,
    BigE: 7,
    SmallE: 7,
    CommSys: 1,
    CommNetwork: 1,
  },
};

const groupURLs = {
  'CS': 'https://www.104.com.tw/jobs/search/?ro=0&keyword=%E8%BB%9F%E9%AB%94&expansionType=area%2Cspec%2Ccom%2Cjob%2Cwf%2Cwktm&order=1&asc=0&page=1&mode=s&jobsource=2018indexpoc&langFlag=0&langStatus=0&recommendJob=1&hotJob=1',
  'DSP' : 'https://www.104.com.tw/jobs/search/?ro=0&keyword=DSP%20%E9%9F%8C%E9%AB%94%E5%B7%A5%E7%A8%8B%E5%B8%AB&expansionType=area%2Cspec%2Ccom%2Cjob%2Cwf%2Cwktm&order=1&asc=0&page=1&mode=s&jobsource=2018indexpoc&langFlag=0&langStatus=0&recommendJob=1&hotJob=1',
  'RF' : 'https://www.104.com.tw/jobs/search/?jobsource=index_s&keyword=RF&mode=s&page=1',
  'ICS': 'https://www.104.com.tw/jobs/search/?ro=0&keyword=IC%E8%A8%AD%E8%A8%88&expansionType=area%2Cspec%2Ccom%2Cjob%2Cwf%2Cwktm&order=1&asc=0&page=1&mode=s&jobsource=2018indexpoc&langFlag=0&langStatus=0&recommendJob=1&hotJob=1',
  'BigE':'https://www.104.com.tw/jobs/search/?ro=0&keyword=%E9%9B%BB%E5%8A%9B%E5%B7%A5%E7%A8%8B%E5%B8%AB&expansionType=area%2Cspec%2Ccom%2Cjob%2Cwf%2Cwktm&order=1&asc=0&page=1&mode=s&jobsource=index_s&langFlag=0&langStatus=0&recommendJob=1&hotJob=1' ,
  'SmallE':'https://www.104.com.tw/jobs/search/?ro=0&keyword=%E9%9B%BB%E5%8A%9B%E5%B7%A5%E7%A8%8B%E5%B8%AB&expansionType=area%2Cspec%2Ccom%2Cjob%2Cwf%2Cwktm&order=1&asc=0&page=1&mode=s&jobsource=index_s&langFlag=0&langStatus=0&recommendJob=1&hotJob=1' ,
  'CommSys':'https://www.104.com.tw/jobs/search/?ro=0&keyword=%E9%80%9A%E8%A8%8A%E7%B3%BB%E7%B5%B1&expansionType=area%2Cspec%2Ccom%2Cjob%2Cwf%2Cwktm&order=1&asc=0&page=1&mode=s&jobsource=index_s&langFlag=0&langStatus=0&recommendJob=1&hotJob=1' ,
  'CommNetwork':'https://www.104.com.tw/jobs/search/?ro=0&keyword=%E9%80%9A%E8%A8%8A%E7%B6%B2%E8%B7%AF&expansionType=area%2Cspec%2Ccom%2Cjob%2Cwf%2Cwktm&order=1&asc=0&page=1&mode=s&jobsource=index_s&langFlag=0&langStatus=0&recommendJob=1&hotJob=1'
}

const groupImages = {
  'CS': './figures/cs.png',
  'DSP': './figures/dsp.png',
  'RF': './figures/rf.png',
  'ICS': './figures/ics.png',
  'BigE': './figures/bige.png',
  'SmallE': './figures/smalle.png',
  'CommSys': './figures/commsys.png',
  'CommNetwork': './figures/commnet.png'
  // Add image URLs for other groups
};

function setRecommend(classname){
    let CS=0;  //計算機組
    let DSP=0;//信號與智慧計算
    let RF=0;//電磁晶片
    let ICS=0;//晶片系統
    let BigE=0;//大電力
    let SmallE=0;//小電力
    let CommSys=0;//通訊系統
    let CommNetwork =0;//通訊網路

    let scores = [
        { name: 'CS', score: 0 },
        { name: 'DSP', score: 0 },
        { name: 'RF', score: 0 },
        { name: 'ICS', score: 0 },
        { name: 'BigE', score: 0 },
        { name: 'SmallE', score: 0 },
        { name: 'CommSys', score: 0 },
        { name: 'CommNetwork', score: 0 }
    ];
  // if(classname[0].value=="線性代數"){
  //   console.log("hah i am a 線性代數");
  // }

  // if( classname.length ==12 ){
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
          CommSys += (courseWeightage.CommSys || 0) * parsedScore;
          CommNetwork += (courseWeightage.CommNetwork || 0) * parsedScore;
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
          { name: 'CommSys', score: CommSys },
          { name: 'CommNetwork', score: CommNetwork }
        ];
        //對分數排序
        scores.sort((a, b) => b.score - a.score);

        // 選出前三名
        let topThree = scores.slice(0, 3);
        console.log('Top three groups:', topThree);
        console.log(typeof topThree[0].name);
        
        let topThreeNames = topThree.map(item => item.name).join(', ');
        document.getElementById("result-group").innerText = topThreeNames;

       //放到more detail的地方

       const names = topThree.map(item => item.name);
      // Create clickable text for the top three recommended groups in the result-information section
        const resultInformation = document.getElementById("result-information");
        resultInformation.innerHTML = names.map(name => {
            const url = groupURLs[name];
            return `<a href="${url}" target="_blank" style="text-decoration: underline">${name}</a>`;
        }).join(', ');

       // Display images below the recommendations
        const recommendImg = document.getElementById("result-img");
        recommendImg.innerHTML = names.map(name => {
            const imageUrl = groupImages[name];
            return `<img src="${imageUrl}" alt="${name} Image" style="max-width: 550px; max-height: 550px; margin-bottom: 20px ">`;
        }).join('');

       // const names = topThree.map(item => item.name);
       // const topThreeURLs = names.map(name => groupURLs[name]);
       // const resultInformation = document.getElementById("result-information");
        //resultInformation.innerHTML = topThreeURLs.map(url => `<a href="${url}"  target="_blank">${url}</a>`).join('<br>');

        //document.getElementById("result-group").innerText = topThree[0].name;

        // scores = { CS, DSP, RF, ICS, BigE, SmallE, CommSys, CommNetwork };
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
// }

// let addButton = document.querySelector(".plus-btn");
// addButton.addEventListener("click", (e)=> {
//     let newForm = document.createElement("form");
//     let newDiv = document.createElement("div");
//     newDiv.classList.add("grader");

//     //製作五個小元素 div裡面的東東
//     let newInput1 = document.createElement("input");
//     newInput1.setAttribute("type","text");
//     newInput1.setAttribute("list","opt");
//     newInput1.classList.add("class-type");

//     let newInput2 = document.createElement("input");
//     newInput2.setAttribute("type","number");
//     newInput2.classList.add("Score");

//     let newInput3 = document.createElement("input");
//     newInput3.setAttribute("type","number");
//     newInput3.setAttribute("min","0");
//     newInput3.setAttribute("max","6");
//     newInput3.classList.add("class-credit");
//     newInput3.addEventListener("change", (e)=>{
//         setGPA();
//     });

//     // here is the select tag
//     let newSelect = document.createElement("select");
//     newSelect.classList.add("select");
//     var opt1 = document.createElement("option");
//     opt1.setAttribute("value", "");
//     let textNode1 = document.createTextNode("");
//     opt1.appendChild(textNode1);
//     var opt2 = document.createElement("option");
//     opt2.setAttribute("value", "A");
//     let textNode2 = document.createTextNode("A");
//     opt2.appendChild(textNode2);
//     var opt3 = document.createElement("option");
//     opt3.setAttribute("value", "A-");
//     let textNode3 = document.createTextNode("A-");
//     opt3.appendChild(textNode3);
//     var opt4 = document.createElement("option");
//     opt4.setAttribute("value", "B+");
//     let textNode4 = document.createTextNode("B+");
//     opt4.appendChild(textNode4);
//     var opt5 = document.createElement("option");
//     opt5.setAttribute("value", "B");
//     let textNode5 = document.createTextNode("B");
//     opt5.appendChild(textNode5);
//     var opt6 = document.createElement("option");
//     opt6.setAttribute("value", "B-");
//     let textNode6 = document.createTextNode("B-");
//     opt6.appendChild(textNode6);
//     var opt7 = document.createElement("option");
//     opt7.setAttribute("value", "C+");
//     let textNode7 = document.createTextNode("C+");
//     opt7.appendChild(textNode7);
//     var opt8 = document.createElement("option");
//     opt8.setAttribute("value", "C");
//     let textNode8 = document.createTextNode("C");
//     opt8.appendChild(textNode8);
//     var opt9 = document.createElement("option");
//     opt9.setAttribute("value", "C-");
//     let textNode9 = document.createTextNode("C-");
//     opt9.appendChild(textNode9);
//     var opt10 = document.createElement("option");
//     opt10.setAttribute("value", "D+");
//     let textNode10 = document.createTextNode("D+");
//     opt10.appendChild(textNode10);
//     var opt11 = document.createElement("option");
//     opt11.setAttribute("value", "D");
//     let textNode11 = document.createTextNode("D");
//     opt11.appendChild(textNode11);
//     var opt12 = document.createElement("option");
//     opt12.setAttribute("value", "D-");
//     let textNode12 = document.createTextNode("D-");
//     opt12.appendChild(textNode12);
//     var opt13 = document.createElement("option");
//     opt13.setAttribute("value", "F");
//     let textNode13 = document.createTextNode("F");
//     opt13.appendChild(textNode13);

//     newSelect.appendChild(opt1);
//     newSelect.appendChild(opt2);
//     newSelect.appendChild(opt3);
//     newSelect.appendChild(opt4);
//     newSelect.appendChild(opt5);
//     newSelect.appendChild(opt6);
//     newSelect.appendChild(opt7);
//     newSelect.appendChild(opt8);
//     newSelect.appendChild(opt9);
//     newSelect.appendChild(opt10);
//     newSelect.appendChild(opt11);
//     newSelect.appendChild(opt12);
//     newSelect.appendChild(opt13);

//     newSelect.addEventListener("change", (e)=>{
//         setGPA();
//         changeColor(e.target);
//     });

//     //-----------------------------

//     //垃圾桶
//     let newButton = document.createElement("button");
//     newButton.classList.add("trash-button");
//     let newItag = document.createElement("i");
//     newItag.classList.add("fas");
//     newItag.classList.add("fa-trash"); 

//     newButton.appendChild(newItag);

//     newButton.addEventListener("click",(e)=>{
//         e.preventDefault();
//         e.target.parentElement.parentElement.style.animation = "scaleDown 0.3s ease forwards";
//         e.target.parentElement.parentElement.addEventListener("animationend", (e)=>{
//             e.target.remove();
//             setGPA();
//         });
//     });
//     //-----------------------------

//     newDiv.appendChild(newInput1);
//     newDiv.appendChild(newInput2);
//     newDiv.appendChild(newInput3);
//     newDiv.appendChild(newSelect);
//     newDiv.appendChild(newButton);

//     newForm.appendChild(newDiv);
//     document.querySelector(".all-inputs").appendChild(newForm);
//     newForm.style.animation = "scaleUp 0.5s ease forwards";
    
// });

// let allTrash = document.querySelectorAll(".trash-button");
// allTrash.forEach(trash =>{
//     trash.addEventListener("click", (e)=>{
//         e.target.parentElement.parentElement.classList.add("remove");
//     });
// });

// allTrash.forEach(trash =>{
//     let form = trash.parentElement.parentElement;
//     form.addEventListener("transitionend", (e)=>{
//         form.remove();
//         setGPA();        //刪除之後要重新計算GPA
//     });
// });

function createFormElement(year) {
  // 创建一个新的 div 元素
  var newDiv = document.createElement("div");
  newDiv.className = "grader";

// // 创建课程名称输入框
// var inputCourse = document.createElement("select");
// inputCourse.setAttribute("type", "text");
// inputCourse.setAttribute("placeholder", "課程名稱");
// inputCourse.className = "class-type";
// if (year == 1)
//   inputCourse.setAttribute("list", "EE1"); // 设置对应的datalist ID
// else if (year == 2)
//   inputCourse.setAttribute("list", "EE2"); // 设置对应的datalist ID
// newDiv.appendChild(inputCourse);

var selectCourse = document.createElement("select");
selectCourse.className = "class-type";
console.log(selectCourse);
// 添加一个空的默认选项
var defaultOption = document.createElement("option");
defaultOption.textContent = "請選擇課程"; // 你可以在这里设置一些提示性的文本
defaultOption.value = "";
selectCourse.appendChild(defaultOption);
if(year == 1)
  var courses = ["線性代數", "邏輯設計", "邏輯設計實驗", "程式設計", "程式設計實習", "計算機概論"];

else if(year == 2)
  var courses = ["機率", "微分方程", "電子學（一）", "電子學（二）", "電路學（一）", "電路學（二）", "電磁學（一）", "訊號與系統", "計算機組織", "資料結構", "電工實驗（一）", "電工實驗（二）", "再生能源導論"];
courses.forEach(function(courseName) {
    var option = document.createElement("option");
    option.value = courseName;
    option.textContent = courseName;
    selectCourse.appendChild(option);
});
newDiv.appendChild(selectCourse);



  // 添加分数输入框
  var inputScore = document.createElement("input");
  inputScore.setAttribute("type", "text");
  inputScore.setAttribute("placeholder", "分數");
  inputScore.className = "Score";
  newDiv.appendChild(inputScore);

  // 添加学分输入框
  var inputCredit = document.createElement("input");
  inputCredit.setAttribute("type", "number");
  inputCredit.setAttribute("placeholder", "學分");
  inputCredit.setAttribute("min", "0");
  inputCredit.setAttribute("max", "6");
  inputCredit.className = "class-credit";
  newDiv.appendChild(inputCredit);
// 添加事件监听器 填入輸入的課程名稱後，自動填入學分
  selectCourse.addEventListener('input', function() {
    const creditInput = this.closest('.grader').querySelector('.class-credit');
    const selectedCourse = this.value;
    const credits = courseCredits[selectedCourse];
    if (credits) {
        creditInput.value = credits;
    }
});

  // 添加评级选择框
  var selectGrade = document.createElement("select");
  selectGrade.name = "select";
  selectGrade.className = "select";
  ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"].forEach(function(grade) {
    var option = document.createElement("option");
    option.value = grade;
    option.textContent = grade;
    selectGrade.appendChild(option);
  });
  newDiv.appendChild(selectGrade);

// 添加删除按钮
var deleteButton = document.createElement("button");
deleteButton.className = "trash-button";
deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
deleteButton.type = 'button'; // 防止按钮默认提交表单

// 添加事件监听器，处理点击事件
deleteButton.addEventListener('click', function(event) {
    event.preventDefault(); // 防止表单提交
    newDiv.remove(); // 删除当前元素
    //setGPA();
});

newDiv.appendChild(deleteButton);
return newDiv;

}

// 动态添加表单元素到页面
function addFormElement(year) {
  if(year == 1)
  var formContainer = document.querySelector(".first-year-section form");
  else if(year == 2)
  var formContainer = document.querySelector(".second-year-section form");
  formContainer.appendChild(createFormElement(year));
}

// 为“添加课程”按钮添加事件监听器
document.getElementById("add-first-year-course").addEventListener("click", function() {
  addFormElement(1);
});
document.getElementById("add-second-year-course").addEventListener("click", function() {
  addFormElement(2);
});


const courseCredits = {
  "線性代數": 3,
  "程式設計": 3,
  "程式設計實習": 1,
  "計算機概論": 3,
  "邏輯設計": 3,
  "邏輯設計實驗": 1,
  "機率": 3,
  "微分方程": 3,
  "電子學（一）": 3,
  "電子學（二）": 3,
  "電路學（一）": 3,
  "電路學（二）": 3,
  "電磁學（一）": 3,
  "訊號與系統": 3,
  "計算機組織": 3,
  "資料結構": 3,
  "電工實驗（一）": 1,
  "電工實驗（二）": 1,
  "再生能源導論": 3
};

