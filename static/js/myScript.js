let i, j;

// 1. 좌측 select로 수입일을 선택했을 때, 2. 우측 +버튼을 눌러서 수입일 검색창이 생성됐을 때 d
// 20201110
// 2. 오프닐으로 표시되는 로고(SVG로??) (1)"FIND" -> (2)"FINE" -> (3)"WINE" = (1) 에서 (2) 로 넘어갈 때 'D'는 아래로 내려가는 애니메이션으로 'E'로 교체되고 (2) 에서 (3)으로 넘어갈 때 'F'는 위로 올라가는 애니메이션으로 'W'로 교체
// 2-2. 최종 표시되는 로고는 "WINE", 검색 활성화 되었을 때 "FIND" 로 에니메이션 (2. 의 반대로)
// 3. min_date_year ~ max_date_day AJAX GET 활성화하기


// topic select, 201105
let iw_cls_ary = [];
let cls_ary = ["k_name", "e_name", "country", "importer", "winery", "date"];
let month_dic = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
};
let today = new Date(),
    today_year = String(today).split(" ")[3][2] + String(today).split(" ")[3][3],
    today_month = month_dic[String(today).split(" ")[1]],
    today_day = String(today).split(" ")[2];



function topic_select() {

    // let q_dbd = $(".date_box > .date"),
    //     ndy = $(".min_date_year"),
    //     ndm = $(".min_date_month"),
    //     ndd = $(".min_date_day"),
    //     xdy = $(".max_date_year"),
    //     xdm = $(".max_date_month"),
    //     xdd = $(".max_date_day");


    let ig = document.getElementsByClassName("input-group"),
        // dd_b = document.getElementsByClassName("dropdown-btn"),
        dd_m = document.getElementsByClassName("dropdown-menu"),
        iw = document.getElementsByClassName("input_wrap"),
        inp = document.getElementsByClassName("form-control");

    for (i = 0; i < ig.length; i++) {
        let dm_a = dd_m[i].querySelectorAll("a");
        for (j = 0; j < dm_a.length; j++) {

            dm_a[j].addEventListener("click", dm_a_event);
            function dm_a_event(event){
                let a_dd_b = this.parentElement.previousElementSibling,
                    a_iw = this.parentElement.parentElement.nextElementSibling,
                    a_inp = a_iw.children[0],
                    a_iw_cls_ary = a_iw.getAttribute("class").split(" ")[1];
                let a_value = this.getAttribute("value") + "_box";

                a_dd_b.innerText = this.innerText;

                // 수입일 제외, 수입일은 따로 기능 넣어주기
                if (a_value === "date_box") {
                    let input_date_html = `
                        <input class="form-control min_fix_inp" type="number" value="20" readonly/>
                        <input class="form-control min_date_year date_year date" id="min_date_year" type="number" value="19" />
                        <label for="min_date_year" class="col-form-label">년</label>
                        <input class="form-control min_date_month date_month date" id="min_date_month" type="number" value="1" />
                        <label for="min_date_month" class="col-form-label">월</label>
                        <input class="form-control min_date_day date_day date" id="min_date_day" type="number" value="1" />
                        <label for="min_date_day" class="col-form-label">일</label>

                        <label class="col-form-label">~</label>

                        <input class="form-control max_fix_inp" type="number" value="20" readonly/>
                        <input class="form-control max_date_year date_year date" id="max_date_year" type="number" value="${today_year}" />
                        <label for="max_date_year" class="col-form-label">년</label>
                        <input class="form-control max_date_month date_month date" id="max_date_month" type="number" value="${today_month}" />
                        <label for="max_date_month" class="col-form-label">월</label>
                        <input class="form-control max_date_day date_day date" id="max_date_day" type="number" value="${today_day}" />
                        <label for="max_date_day" class="col-form-label">일</label>
                    `;
                    a_iw.innerHTML = input_date_html;

                } else {
                    let input_html = `
                        <input type="text" class="form-control ${a_value}" aria-label="Text input with dropdown button">
                        `;
                    a_iw.innerHTML = input_html;
                }
                a_iw.classList.remove(a_iw_cls_ary);
                a_iw.classList.add(a_value);

                iw_cls_ary_push();
                select_hide();
                dbd_change_event();
                search_btn_event();
                this.addEventListener("click", dm_a_event);
            }
        }


        // dd_b_ary에 있는 값과 a(value)의 값이 같은 것들은 모두 class add .hide, +추가할 때도
    }
    // console.log(iw_cls_ary);

    function iw_cls_ary_push() {
        iw_cls_ary.splice(0, iw_cls_ary.length);
        for (i = 0; i < ig.length; i++) {
            iw_cls_ary.push(iw[i].getAttribute("class").split(" ")[1]);
        }
    }
    iw_cls_ary_push();

    function select_hide() {
        let a_Tag = document.querySelectorAll(".dropdown-menu > a");
        for (i = 0; i < a_Tag.length; i++) {
            if (iw_cls_ary.includes(a_Tag[i].getAttribute("value") + "_box")) {
                a_Tag[i].classList.add("hide");
            } else {
                a_Tag[i].classList.remove("hide");
            }
        }
    }
    select_hide();


    function dbd_change_event() {
        let dbd = document.querySelectorAll(".date_box > .date"),
            ndy = dbd[0],
            ndm = dbd[1],
            ndd = dbd[2],
            xdy = dbd[3],
            xdm = dbd[4],
            xdd = dbd[5];
        for (i = 0; i <  dbd.length; i++) {
            dbd[i].addEventListener("change", function (event) {
                date_range(ndy, 19, 20);
                date_range(ndm, 1, 12);
                date_range(ndd, 1, 31);
                date_range(xdy, 19, 20);
                date_range(xdm, 1, 12);
                date_range(xdd, 1, 31);
            });
        }

        function date_range(name, min, max) {
            if (name.value === "") {
                name.value = name.getAttribute("value");
            } else if (name.value < min) {
                name.value = min;
            } else if (name.value > max) {
                name.value = max;
            }
        }
    }
    dbd_change_event();

    // 20201110 success
    function search_btn_event() {
        let q_ig = $(".input-group");
        let inp_box_ary = [];
        for (i = 0; i < q_ig.length; i++) {
            inp_box_ary.push(q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1]);
        }
        // console.log(inp_box_ary);
        if (inp_box_ary.includes("date_box")) {
            // search show
            $(".search_btn").show();
        } else {
            $(".search_btn").hide();
        }
        let inp_not_date = $(".input_wrap:not(.date_box) > .form-control");
        for (i = 0; i < inp_not_date.length; i++) {
            inp_not_date.eq(i).on("keyup", function(event) {
                for (j = 0; j < inp_not_date.length; j++) {
                    if (inp_not_date.eq(j).val() === "") {
                        $(".search_btn").hide();
                        // search hide
                    } else {
                        $(".search_btn").show();
                        // search show
                        break
                    }
                }
            });
        }
        // for (i = 0; i < iw_inp_not_fix.length; i++) {
        // iw_inp_not_fix.on("keyup", function (evnet) {
        //     let inp_val_ary = [];
        //     for (j = 0; j < q_ig.length; j++) {
        //         if (q_ig.eq(j).find(".input_wrap").attr("class").split(" ")[1] !== "date_box") {
        //             inp_val_ary.push(q_ig.eq(j).find(".form-control").val());
        //         }
        //     }
        //     for (j = 0; j < inp_val_ary.length; j++) {
        //         if (inp_val_ary[j].includes("")) {
        //
        //         }
        //     }
        //     // console.log(inp_val_ary);
        //     // console.log(inp_val_ary.includes(""));
        // });
            // console.log(i);
        // }

            // let none_val = 0;
            // for (i = 0; i < q_ig.length; i++) {
            //     if (q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1] !== "date_box") {
            //         if (q_ig.eq(i).find(".form-control").val() === "") {
            //             none_val++;
            //             console.log("ig_=" + none_val);
            //         } else (
            //             console.log("ig_=nothing")
            //         )
            //         console.log("test" + i);
            //     }
            // }
            // if (q_ig.find(".input_wrap:not(.date_box)").length !== none_val) {
            //     none_val = 0;
            //     console.log("ig_2=" + none_val);
            // } else (
            //     console.log("ig_2=nothing")
            // )
            // for (i = 0; i < q_ig.length; i++) {
            //     if (q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1] === "date_box") {
            //         for (j = 0; j < dbd.length; j++) {
            //             if (dbd.eq(j).val() === "") {
            //                 none_val++
            //                 console.log("dbd=" + none_val);
            //             } else (
            //                 console.log("dbd=nothing")
            //             )
            //         }
            //     }
            // }
            // console.log(none_val);
            // console.log(none_val);
            // if (none_val === 0) {
            //     $(".search_btn").show();
            // } else {
            //     $(".search_btn").hide();
            // }
        // });
    }
    search_btn_event();

    // function topic_select_function() {
    //     inp_cls_ary_push();
    //     select_hide();
    // }
    // inp[0].focus();
}
topic_select();

// dbd_change_event() function


// function date_input_base_val() {
//     // javascript 로??
//     $("#min_date_year").val("19");
//     // document.getElementsByClassName("min_date_year").value = 19;
// }
// date_input_base_val();

// 이거 해야됨 ***************************************************************************************
// date input 안에 숫자 범위 적용시키기
// 아래 두 코드 활용
// date_year, date_month, date_day
// input 안에 값이 존재할 때 search 버튼 나타나게 하기
// document.getElementsByClassName("k_name")[0].addEventListener("keyup", test_event);
// function test_event(event) {
//     if (this.value != "") {
//         document.getElementsByTagName("h1")[0].style.color = "red";
//     } else {
//         document.getElementsByTagName("h1")[0].style.color = "black";
//     }
//     this.addEventListener("change", test_event);
// }
// jquery
// for (i = 0; i < q_ig.length; i++) {
//     if (inp_v(i) !== "") {
//         // search show
//     } else if (q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1] === "date_box") {
//         if (ndy.val() === "" || ndm.val() === "" || ndd.val() === "" || xdy.val() === "" || xdm.val() === "" || xdd.val() === "") {
//             // search hide
//         }
//     } else if () {
//     }
// }
//     function inp_v(n) {
//     return q_ig.eq(n).find(".input_wrap:not(.date_box) > input").val();
// }

// for (i = 0; i < inp_cls_ary.length; i++) {
//     q_ig.find("." + inp_cls_ary)
// }


// jquery event 안에 javascript 코드가 실행 되는지
// function test() {
//     document.getElementsByTagName("h1")[0].style.color = "red";
// }
// $("h1").on("click", function(event){
//     test();
// });



// input add button
// input-group style border-radius
// 6개가 되면 + -> x(class 사용?)
// function input_add_btn() {

$(".add_btn").on("click", add_btn_event);
function add_btn_event(event) {
    let q_ig = $(".input-group");
    let dd_b_txt_ary = ["한글명", "영문명", "제조국", "수입사", "와이너리", "수입일"],
        iw_cls_ary = ["k_name_box", "e_name_box", "country_box", "importer_box", "winery_box", "date_box"],
        inp_cls_ary = cls_ary;

    for (i = 0; i < q_ig.length; i++) {
        dd_b_txt_ary.splice(dd_b_txt_ary.indexOf(q_ig.eq(i).find(".dropdown-btn").text()), 1);
        iw_cls_ary.splice(iw_cls_ary.indexOf(q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1]), 1);
        inp_cls_ary.splice(inp_cls_ary.indexOf(q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1].replace("_box", "")), 1);
    }

    let add_html = `
            <div class="input-group">
                <div class="input-group-prepend">
                    <button class="dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${dd_b_txt_ary[0]}</button>
                    <div class="dropdown-menu">
                        <a class="k_slt" href="javascript:void(0)" value="k_name">한글명</a>
                        <a class="e_slt" href="javascript:void(0)" value="e_name">영문명</a>
                        <a class="c_slt" href="javascript:void(0)" value="country">제조국</a>
                        <a class="i_slt" href="javascript:void(0)" value="importer">수입사</a>
                        <a class="w_slt" href="javascript:void(0)" value="winery">와이너리</a>
                        <a class="d_slt" href="javascript:void(0)" value="date">수입일</a>
                    </div>
                </div>
                <div class="input_wrap ${iw_cls_ary[0]}">
                    <input type="text" class="form-control ${inp_cls_ary[0]}" aria-label="Text input with dropdown button">
                </div>
                <div class="input-group-append">
                    <button class="remove_btn" type="button">
                        <svg viewBox="0 0 20 20" width="20" height="20">
                            <path fill="none" stroke="#000" stroke-width="2" d="M 0 10 L 20 10 Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    let add_date_html = `
            <div class="input-group">
                <div class="input-group-prepend">
                    <button class="dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">수입일</button>
                    <div class="dropdown-menu">
                        <a class="k_slt" href="javascript:void(0)" value="k_name">한글명</a>
                        <a class="e_slt" href="javascript:void(0)" value="e_name">영문명</a>
                        <a class="c_slt" href="javascript:void(0)" value="country">제조국</a>
                        <a class="i_slt" href="javascript:void(0)" value="importer">수입사</a>
                        <a class="w_slt" href="javascript:void(0)" value="winery">와이너리</a>
                        <a class="d_slt" href="javascript:void(0)" value="date">수입일</a>
                    </div>
                </div>

                <!-- 이것만 따로 붙여주기?? -->
                <div class="input_wrap date_box">
                    <input class="form-control min_fix_inp" type="number" value="20" readonly/>
                    <input class="form-control min_date_year date_year date" id="min_date_year" type="number" value="19" />
                    <label for="min_date_year" class="col-form-label">년</label>
                    <input class="form-control min_date_month date_month date" id="min_date_month" type="number" value="1" />
                    <label for="min_date_month" class="col-form-label">월</label>
                    <input class="form-control min_date_day date_day date" id="min_date_day" type="number" value="1" />
                    <label for="min_date_day" class="col-form-label">일</label>

                    <label class="col-form-label">~</label>

                    <input class="form-control max_fix_inp" type="number" value="20" readonly/>
                    <input class="form-control max_date_year date_year date" id="max_date_year" type="number" value="${today_year}" />
                    <label for="max_date_year" class="col-form-label">년</label>
                    <input class="form-control max_date_month date_month date" id="max_date_month" type="number" value="${today_month}" />
                    <label for="max_date_month" class="col-form-label">월</label>
                    <input class="form-control max_date_day date_day date" id="max_date_day" type="number" value="${today_day}" />
                    <label for="max_date_day" class="col-form-label">일</label>
                </div>

                <div class="input-group-append">
                    <button class="remove_btn" type="button">
                        <svg viewBox="0 0 20 20" width="20" height="20">
                            <path fill="none" stroke="#000" stroke-width="2" d="M 0 10 L 20 10 Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

    // add .remove_all_btn, remove .add_btn, .add_btn outside .remove_all_btn event
    if (q_ig.length < 5) {
        if (iw_cls_ary[0] === "date_box") {
            $(".form_column_box").append(add_date_html);
        } else {
            $(".form_column_box").append(add_html);
        }
        // $(".input-group").eq(q_ig.length).addClass("slide");
    } else if (q_ig.length === 5) {
        if (iw_cls_ary[0] === "date_box") {
            $(".form_column_box").append(add_date_html);
        } else {
            $(".form_column_box").append(add_html);
        }
        // $(".input-group").eq(q_ig.length).addClass("slide");
        $(".dropdown-menu").addClass("hide");
        $(this).addClass("remove_all_btn");
        $(this).off("click");
        $(".remove_all_btn").on("click", remove_all_btn_event);
    }

    $(".remove_btn").on("click", function(event){
        let q_ig = $(".input-group");
       if (q_ig.length === 6) {
           $(".dropdown-menu").removeClass("hide");
           $(".remove_all_btn").off("click")
           $(".add_btn").on("click", add_btn_event).removeClass("remove_all_btn");
       }
       $(this).parent().parent().remove();

       topic_select();
    });


    topic_select();

}

function remove_all_btn_event(event) {
    let q_ig = $(".input-group");
    for (i = 0; i < q_ig.length; i++) {
        console.log("great");
        q_ig.eq(i + 1).remove();
    }
    $(".dropdown-menu").removeClass("hide");
    $(this).off("click");
    $(this).removeClass("remove_all_btn");
    $(".add_btn").on("click", add_btn_event);

    topic_select();
}

// }
// input_add_btn();


// remove_btn



// ajax

// $(document).ready(function () {
// $("#content_box").html("");      // 임시 주석
// showArticles();
// });

// input 에 change event
// table show, logo click hide
$(".search_btn").on("click", function(event) {
    // postArticle();
    $("#content_box").empty();
    showArticles();
});

// showArticles();

// function postArticle() {
//     let k_name, e_name, country, importer, winery, date_min, date_max;
//     k_name = $("#search_k_name").val();
//     e_name = $("#search_e_name").val().toUpperCase();
//     country = $("#search_country").val();
//     importer = $("#search_importer").val();
//     winery = $("#search_winery").val().toUpperCase();
//     date_min = $("#search_date_min").val();
//     date_max = $("#search_date_max").val();
//
//     // console.log(url, comment)
//     $.ajax({
//         type: "POST",
//         url: "/wine",
//         data: {"k_name_give": k_name, "e_name_give": e_name, "country_give": country, "importer_give": importer, "winery_give": winery},   // app.py로 보내기?, date 임시 제거
//         success: function (response) { // 성공하면
//             // if (response["result"] == "success") {
//             //     alert(response["msg"]);
//             //     window.location.reload();
//             // }
//             console.log("search_POST");
//         }
//     })
// }

// Enter 누르면 검색 되게끔 하기, 통합검색도 구현하기
// 기본 수입일 정렬(다음 한글이름순), 각각 정렬로 보기 기능 구현하기, 클릭중일 때 삐죽 튀어나왔다가 튀어나온 방향으로 드레그 하면 열리는 기능?
// 결과값이 너무 많으면 한 페이지에 20개 정도 출력?
// 띄어쓰기 생략해도 검색 가능하게끔?(일단 k_name ~ winery만 구현)
// google 처럼 한글자 검색할 때마다 나오는 자동완성? 창 문자열 index 가 가장 낮은 순서대로 나오게(5개정도?)
function showArticles() {
    let q_ig = $(".input-group");
    let k_name_val = "",
        e_name_val = "",
        country_val = "",
        importer_val = "",
        winery_val = "",
        date_val = "", date_min_val, date_max_val;
    // let val_name_ary = [k_name_val, e_name_val, country_val, importer_val, winery_val, date_val];
    // let inp_cls_ary2 = ["k_name", "e_name", "country", "importer", "winery", "date"];
    // 여기 문제, 요소(input)를 찾을 수 없어서 오류
    console.log(inp_cls_ary);   // 글로벌 변수로 빼내 주어서 사용 가능
    function inp_val() {
        // for (i = 0; i < q_ig.length; i++) {
        //     for (j = 0; j < inp_cls_ary2.length; j++) {
        //
        //     if (inp_cls_ary.includes(q_ig.eq(i).find(".form-control").attr("class").split(" ")[1])) {        // 2
        //         if (q_ig.eq(i).find(".form-control").attr("class").split(" ")[1].includes(inp_cls_ary2[j])) {
        //             console.log("true");
        //             // .toUpperCase()를 따로 줘야하나??, 한글은 적용이 안돼서 상관이 없을 듯??????
        //             // 배열로 변수적용이 안되는 듯
        //             // val_name_ary[j] = $(inp_cls_ary2[j]).val().toUpperCase().replace(" ", "");
        //             k_name_val = $(inp_cls_ary2[j]).val().toUpperCase().replace(" ", "");
        //         } else {
        //             console.log(inp_cls_ary2[j] + "_false");
        //             // val_name_ary[j] = $(".search_btn").val();
        //             k_name_val = "";
        //         }
        //
        //     }
        // }

        // switch!!!, GOOD!!!
        for (i = 0; i < q_ig.length; i++) {
            // if (inp_cls_ary.includes(q_ig.eq(i).find(".form-control").attr("class").split(" ")[1])) {
            // // if (q_ig.eq(i).find(".form-control").attr("class").split(" ")[1].includes("k_name")) {
            //     console.log("true");
            //     k_name_val = $("k_name").val().toUpperCase().replace(" ", "");
            // } else {
            //     console.log("false");
            //     k_name_val = "";
            // }

            switch (q_ig.eq(i).find(".form-control").attr("class").split(" ")[1]) {
                case 'k_name':
                    k_name_val = $(".k_name").val().replace(" ", "");
                    break;
                case 'e_name':
                    e_name_val = $(".e_name").val().toUpperCase().replace(" ", "");
                    break;
                case 'country':
                    country_val = $(".country").val().replace(" ", "");
                    break;
                case 'importer':
                    importer_val = $(".importer").val().replace(" ", "");
                    break;
                case 'winery':
                    winery_val = $(".winery").val().toUpperCase().replace(" ", "");
                    break;
                case 'date':
                    // not yet
                    date_val = "";
                    break;
                default:
                    break;
                // default 가 없어도 되나???
            }

        }

    }
    inp_val();

    console.log(k_name_val, e_name_val, country_val, importer_val, winery_val, date_val);
    // k_name_val = q_ig.eq(0).find(q_ig.find(".form-control").attr("class").split(" ")[1]).val().replace(" ", "");     // 이런식으로???, XXX
    // k_name_val = $(".k_name").val().replace(" ", "");
    // e_name_val = $(".e_name").val().toUpperCase().replace(" ", "");
    // country_val = $(".country").val().replace(" ", "");
    // importer_val = $(".importer").val().replace(" ", "");
    // winery_val = $(".winery").val().toUpperCase().replace(" ", "");
    // date_min_val = $(".date_min").val();
    // date_max_val = $(".date_max").val();

    $.ajax({
        type: "GET",
        url: "/wine",
        data: {},
        success: function (response) {
            let wines = response["wines"];
            let num = 0;

            // 일단 수입일은 제외(||)
            // if (k_name_val === "" && e_name_val === "" && country_val === "" && importer_val === "" && winery_val === "" && date_min_val === "" && date_max_val === "") {        // thaed display:none, 검색결과가 있으면 다시 display: block
            if (k_name_val === "" && e_name_val === "" && country_val === "" && importer_val === "" && winery_val === "") {
                alert("검색할 내용을 입력해주세요.");
            } else {
                for (let i = 0; i < wines.length; i++) {
                    let wine = wines[i];
                    let k_name = wine["와인_이름_kr"];
                    let e_name = wine["와인_이름_en"];
                    let country = wine["제조국"];
                    let importer = wine["수입사"];
                    let winery = wine["와이너리"];
                    let date = wine["수입일"];

                    // date_range_calculation
                    // let date_boolean;
                    // let min = date_min_val.split("-");
                    // let date_array = date.split("-");
                    // let max = date_max_val.split("-");
                    // if (Number(min[0]) === Number(date_array[0])) {
                    //     if (Number(min[1]) === Number(date_array[1])) {
                    //         if (Number(min[2]) <= Number(date_array[2])) {
                    //             // console.log("min_day_true");
                    //             date_boolean = true;
                    //         } else {
                    //             // console.log("min_day_false");
                    //             date_boolean = false;
                    //         }
                    //     } else if (Number(min[1]) < Number(date_array[1])) {
                    //         // console.log("min_month_true");
                    //         date_boolean = true;
                    //     } else {
                    //         // console.log("min_month_false");
                    //         date_boolean = false;
                    //     }
                    // } else if (Number(min[0]) < Number(date_array[0]) < Number(max[0])) {
                    //     // console.log("date_tear_true");
                    //     date_boolean = true;
                    // } else if (Number(date_array[0]) === Number(max[0])) {
                    //     if (Number(date_array[1]) === Number(max[1])) {
                    //         if (Number(date_array[2]) <= Number(max[2])) {
                    //             // console.log("max_day_true");
                    //             date_boolean = true;
                    //         } else {
                    //             // console.log("max_day_false");
                    //             date_boolean = false;
                    //         }
                    //     } else if (Number(date_array[1]) < Number(max[1])) {
                    //         // console.log("max_month_true");
                    //         date_boolean = true;
                    //     } else {
                    //         // console.log("max_month_false");
                    //         date_boolean = false;
                    //     }
                    // } else {
                    //     // console.log("date_year_false");
                    //     date_boolean = false;
                    // }

                    // 여기도 문제, boolean 값을 얻지 못해서
                    // if (k_name.replace(" ", "").includes(k_name_val) && e_name.replace(" ", "").includes(e_name_val) && country.replace(" ", "").includes(country_val) && importer.replace(" ", "").includes(importer_val) && winery.replace(" ", "").includes(winery_val) || date_boolean) {
                    if (k_name.replace(" ", "").includes(k_name_val) && e_name.replace(" ", "").includes(e_name_val) && country.replace(" ", "").includes(country_val) && importer.replace(" ", "").includes(importer_val) && winery.replace(" ", "").includes(winery_val)) {
                        let html = `
                            <tr id="tr_${num}">
                                <td>${k_name}</td>
                                <td>${e_name}</td>
                                <td>${country}</td>
                                <td>${importer}</td>
                                <td>${winery}</td>
                                <td>${date}</td>
                            </tr>
                        `;
                        $("#content_box").append(html);
                        num++;
                    }

                    console.log("GET");

                    // $("#content_box").append(html);
                    // console.log(k_name);
                    // window.location.reload();    // 이미 있다??
                }

                if ($("#content_box > tr").length === 0) {
                    alert("검색 결과를 찾을 수 없습니다.");
                    console.log("nothing");
                }
            }

            // console.log(wines)       // 확인

            // if (response["result"] == "success") {
            //     alert(response["msg"]);
            // }
        }
    })
}