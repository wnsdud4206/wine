let i, j;

// 1. 좌측 select로 수입일을 선택했을 때, 2. 우측 +버튼을 눌러서 수입일 검색창이 생성됐을 때 ㅇ
// 20201110
// 2. 오프닝으로 표시되는 로고(SVG로??) (1)"FIND" -> (2)"FINE" -> (3)"WINE" = (1) 에서 (2) 로 넘어갈 때 'D'는 아래로 내려가는 애니메이션으로 'E'로 교체되고 (2) 에서 (3)으로 넘어갈 때 'F'는 위로 올라가는 애니메이션으로 'W'로 교체
// 2-2. 최종 표시되는 로고는 "WINE", 검색 활성화 되었을 때 "FIND" 로 에니메이션 (2. 의 반대로)
// 3. min_date_year ~ max_date_day AJAX GET 활성화하기

// *** date input 을 2개만 해서 (ex. 2019-01-01) 직접 입력하도록 바꾸기??


// client 접속 ip
let client_ip = ip();

// $(function(){
let wraps = $(".logo > div"),
    FD_w = $(".FIND_wrap"),
    FE_w = $(".FINE_wrap"),
    WE_w = $(".WINE_wrap"),
    W_f = FD_w.find(".WF_wrap").find(".W_font"),
    F_f = FD_w.find(".WF_wrap").find(".F_font"),
    IN_f = FD_w.find(".IN_font"),
    D_f = FD_w.find(".DE_wrap").find(".D_font"),
    E_f = FD_w.find(".DE_wrap").find(".E_font"),
    FE_f = FE_w.find(".FINE_font"),
    WE_f = FE_w.find(".WINE_font"),
    con_f = $(".container-fluid");

$(function() {
    // FD_w.removeClass("FIND_tlx");
    // FE_w.removeClass("FINE_opa");
    // WE_w.removeClass("WINE_opa_tlx");
    //
    // W_f.addClass("W_ani");
    // F_f.addClass("F_ani");
    // IN_f.addClass("IN_ani");
    // D_f.addClass("D_ani");
    // E_f.addClass("E_ani");

    // animation 도 html에 미리 넣어두지 말고 jquery로 addClass 하기?? 새로고침할 때 애니메이션이 깨질 때가 많음
});
// });

// $(".k_name").focus();


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

let all_inp;

function all_inp_refresh() {
    return all_inp = $(".input-group input:not(input[class*='fix'])");
}


let ig = document.getElementsByClassName("input-group"),
    // dd_b = document.getElementsByClassName("dropdown-btn"),
    dd_m = document.getElementsByClassName("dropdown-menu"),
    iw = document.getElementsByClassName("input_wrap");





function dm_a_refresh() {
    for (i = 0; i < ig.length; i++) {
        let dm_a = dd_m[i].querySelectorAll("a");
        for (j = 0; j < dm_a.length; j++) {

            dm_a[j].onclick = dm_a_event;

            function dm_a_event(event) {
                let a_dd_b = this.parentElement.previousElementSibling,
                    a_iw = this.parentElement.parentElement.nextElementSibling,
                    // a_inp = a_iw.children[0],
                    a_iw_cls_ary = a_iw.getAttribute("class").split(" ")[1];
                let a_value = this.getAttribute("value") + "_box";

                // alert(this.innerText)
                a_dd_b.innerText = this.innerText;

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
                    <input type="text" class="form-control ${a_value.replace("_box", "")}" aria-label="Text input with dropdown button">
                    `;
                    a_iw.innerHTML = input_html;
                }
                a_iw.classList.remove(a_iw_cls_ary);
                a_iw.classList.add(a_value);

                topic_select();
                // this.addEventListener("click", dm_a_event);

                // XXX
                // return false;
            }
        }
    }
}
dm_a_refresh();

function iw_cls_ary_push() {
    iw_cls_ary.splice(0, iw_cls_ary.length);
    for (i = 0; i < ig.length; i++) {
        iw_cls_ary.push(iw[i].getAttribute("class").split(" ")[1]);
    }
}

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

function dbd_change_event() {
    let dbd = document.querySelectorAll(".date_box > .date"),
        ndy = dbd[0],
        ndm = dbd[1],
        ndd = dbd[2],
        xdy = dbd[3],
        xdm = dbd[4],
        xdd = dbd[5];
    for (i = 0; i < dbd.length; i++) {
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

// remove_btn 을 클릭했을 때 search_btn hide되는 문제 - 해결
function search_btn_event() {
    let q_ig = $(".input-group");
    let iw_cls_new_ary = [];
    for (i = 0; i < q_ig.length; i++) {
        iw_cls_new_ary.push(q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1]);
    }

    // 1. .date_box가 1번째 위치에 있고 .input_wrap이 .date_box 하나밖에 없을 때 show
    // 2-1. .date_box가 있던 없던 모든 .input_box 내의 .form-control val() === "" 일때 hide
    // 2-2. .date_box가 있던 없던 모든 .input_box 내의 .form-control val() 값이 하나라도 존재(!== "")할 때 show

    if (iw_cls_new_ary.length === 1 && iw_cls_new_ary.includes("date_box")) {

        // $(".search_btn").show();
        // console.log("error");
        sch_show();

        $(".dropdown-menu > a").on("click", date_sch_hide);

        function date_sch_hide(event) {
            sch_hide();
            $(".dropdown-menu > a").off("click", date_sch_hide);
        }

    } else {
        // $(".search_btn").hide();
        // let inp_not_date = $(".input_wrap:not(.date_box) > .form-control");

        // sch_hide();
        $(".input_wrap:not(.date_box) > .form-control").on("keyup", function (event) {

            if (window.event.keyCode !== 13) {
                inp_not_date_keyup_event();
            } else {
                if (FD_w.attr("class").split(" ").includes("search_btn")) {
                    postArticle();
                    // showArticles2();
                }
            }
        });
    }
}

function sch_show() {
    W_f.addClass("W_sch");
    F_f.addClass("F_sch");
    IN_f.addClass("IN_sch");
    D_f.addClass("D_sch");
    E_f.addClass("E_sch");

    FD_w.addClass("search_btn");

    // bind??, 아니면 attr("onclick", search_btn_refresh)??
    // $(".search_btn").bind("click", search_btn_refresh);

    W_f.removeClass("W_sch_hide");
    F_f.removeClass("F_sch_hide");
    IN_f.removeClass("IN_sch_hide");
    D_f.removeClass("D_sch_hide");
    E_f.removeClass("E_sch_hide");
}

function sch_hide() {
    W_f.addClass("W_sch_hide");
    F_f.addClass("F_sch_hide");
    IN_f.addClass("IN_sch_hide");
    D_f.addClass("D_sch_hide");
    E_f.addClass("E_sch_hide");

    FD_w.removeClass("search_btn");

    W_f.removeClass("W_sch");
    F_f.removeClass("F_sch");
    IN_f.removeClass("IN_sch");
    D_f.removeClass("D_sch");
    E_f.removeClass("E_sch");
}

// inp 값이 모두 채워지면 show 수정??
function inp_not_date_keyup_event() {
    for (i = 0; i < $(".input_wrap:not(.date_box) > .form-control").length; i++) {
        if ($(".input_wrap:not(.date_box) > .form-control").eq(i).val() === "") {
            // $(".search_btn").hide();
            sch_hide();
        } else {
            // $(".search_btn").show();
            sch_show();
            break
        }
    }
}

function topic_select() {
    dm_a_refresh();

    iw_cls_ary_push();
    select_hide();
    dbd_change_event();
    search_btn_event();
    all_inp_refresh();
}

topic_select();





// input add button
// input-group style border-radius
// 6개가 되면 + -> x(class 사용?)
// function input_add_btn() {
// sch_btn addClass 가 되면서 애니메이션이 작동하는 문제
$(".add_btn").on("click", add_btn_event);
function add_btn_event(event) {
    let q_ig = $(".input-group");
    let dd_b_txt_ary = ["한글명", "영문명", "제조국", "수입사", "와이너리", "수입일"],
        iw_cls_ary = ["k_name_box", "e_name_box", "country_box", "importer_box", "winery_box", "date_box"],
        inp_cls_ary = cls_ary;

    for (i = 0; i < q_ig.length; i++) {
        dd_b_txt_ary.splice(dd_b_txt_ary.indexOf(q_ig.eq(i).find(".dropdown-btn").text()), 1);
        iw_cls_ary.splice(iw_cls_ary.indexOf(q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1]), 1);
        // inp_cls_ary.splice(inp_cls_ary.indexOf(q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1].replace("_box", "")), 1);
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
                    <input type="text" class="form-control ${iw_cls_ary[0].replace("_box", "")}" aria-label="Text input with dropdown button">
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
        console.log("ddd");
        $(".dropdown-menu").addClass("hide");
        $(this).addClass("remove_all_btn").off("click");
        $(".remove_all_btn").on("click", remove_all_btn_event);
    }

    $(".remove_btn").on("click", function (event) {
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

                                            if ($("form").attr("class").split(" ").length > 1) {
                                                inp_refresh();
                                            }
                                            $(".result_form").removeClass("visible_form").css("height", (36 * $(".input-group").length) + "px");

}

function remove_all_btn_event(event) {
    let q_ig = $(".input-group");

    for (i = 0; i < q_ig.length; i++) {
        q_ig.eq(i + 1).remove();
    }
    $(".dropdown-menu").removeClass("hide");
    $(this).off("click").removeClass("remove_all_btn");
    $(".add_btn").on("click", add_btn_event);

    topic_select();

                                            $(".result_form").css("height", "36px");

}

// }
// input_add_btn();


// control_circle - javascript
// let cw = document.getElementById("control_wrap"),
//     cc = document.getElementById("control_circle");
// let ot = document.getElementById("offset_test");
// // onmoouse 로 주기??
//
// cw.addEventListener("mousedown", function (e) {
//     console.log("down");
//     move_event(e);
//     this.addEventListener("mousemove", move_event);
// });
// document.addEventListener("mouseup", function (e) {
//     console.log("up");
//     cw.removeEventListener("mousemove", move_event);
//
//     cc.style.top = (80 / 2) - (24 / 2) + "px";
//     cc.style.left = (80 / 2) - (24 / 2) + "px";
// });
// function move_event(e) {
//     let ox = e.offsetX,
//         oy = e.offsetY;
//     ot.innerText = "X: " + ox + ", Y: " + oy;
//
//     cc.style.top = (oy - 12) + "px";
//     cc.style.left = (ox - 12) + "px";
// }





// ajax

// input 에 change event
// table show, logo click hide
// $(".search_btn").on("click", search_btn_refresh);
// input value empty(), logo && input fixed top - class를 이용해서
// table hide -> show
FD_w.on("click", function (event) {
// function search_btn_refresh(event) {
    if ($(this).attr("class").split(" ").includes("search_btn")) {
        postArticle();
        // showArticles2();
    }
});

function home_btn_event(event) {
    window.location.reload();
}
function top_btn_event(event) {
    window.scrollTo(0, 0);
}


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


// 임시 전역함수로 빼주기
let form = $("form");
let rf,
    inp_stop,       // tock
    inp_hide;       // tick
// 그냥 enter, leave 만?? element가 다 달라서 event 적용이 힘듦
function inp_add_cls() {
    form.addClass("result_form");
    rf = $(".result_form");
}

function inp_refresh() {

    // .on(+ addEventListener) 메소드는 event 중첩이 돼서 refresh 해줄 때 .off 해줘야 됨
    rf.off("mouseenter mousemove mouseleave").on("mouseenter mousemove", function (event) {
        inp_stop_func();
    }).on("mouseleave", function (event) {
        inp_hide_func();
    });

    $(".dropdown-btn").off("click").on("click", event => rf.addClass("visible_form"));
    // $(".dropdown-btn").on("click", event => rf.addClass("visible_form"));
}
function inp_stop_func() {
    inp_stop = clearTimeout(inp_hide);
    rf.css("height", (36 * $(".input-group").length) + "px");
}
function inp_hide_func() {
    if (all_inp.length !== 1) {
        inp_hide = setTimeout(function () {
            inp_hide_object();
        }, 1000);
    }
}
function inp_hide_object() {
    rf.css("height", "36px").removeClass("visible_form");
    $(".dropdown-menu").removeClass("show");
}

// search_filter

// Enter 누르면 검색 되게끔 하기, 통합검색도 구현하기
// 기본 수입일 정렬(다음 한글이름순), 각각 정렬로 보기 기능 구현하기, 클릭중일 때 삐죽 튀어나왔다가 튀어나온 방향으로 드레그 하면 열리는 기능?
// 결과값이 너무 많으면 한 페이지에 20개 정도 출력?
// 띄어쓰기 생략해도 검색 가능하게끔?(일단 k_name ~ winery만 구현)
// google 처럼 한글자 검색할 때마다 나오는 자동완성? 창 문자열 index 가 가장 낮은 순서대로 나오게(5개정도?)


let io = $("#ip_object"),
    n_insert = $("#name_insert"),
    t_w = $("#text_wrap"),
    i_i_t = $(".insert_info_text"),
    n_inp_w = $("#name_inp_wrap"),
    n_inp = $("#name_inp"),
    n_insert_btn = $(".name_insert_btn"),
    c_a = $(".check_alert"),
    u_inp_n = $(".user_inp_name"),
    c_no = $(".check_no"),
    c_ok = $(".check_ok");
// name_insert_object();
function name_insert_object() {

    setTimeout(function () {
        io.show();
        n_insert.slideDown(600).css("display", "flex");
        setTimeout(function () {
            i_i_t.eq(1).removeClass("test_ani")
        }, 1200);
    }, 300);

    n_inp.on("focusin", function () {
        n_inp_w.addClass("font_size_cls");
        t_w.removeClass("font_size_cls");
        i_i_t.eq(1).css("width", "296px");
    }).on("focusout", function () {
        t_w.addClass("font_size_cls");
        n_inp_w.removeClass("font_size_cls");
        i_i_t.eq(1).css("width", "443.8px");
    }).on("keyup", function () {
        let wid = $(this).width();
        if ($(this).val().length > 2) {
            $(this).width(80 + (20 * ($(this).val().length - 2)));
        } else {
            $(this).width(80);
        }

        if ($(this).val() !== "") {
            n_insert_btn.addClass("name_insert_post");
        } else {
            n_insert_btn.removeClass("name_insert_post");
        }
    });

    n_insert_btn.on("click", function (event) {
        if ($(this).attr("class").includes("name_insert_post")) {
            c_a.slideDown(300).css("display", "flex");
            u_inp_n.text(n_inp.val());
            c_a.removeClass("hide");

            c_no.off("click").on("click", function () {
                c_a.addClass("hide");
                n_inp.focus();
            });
            c_ok.off("click").on("click", function () {
                console.log("name_insert");
                c_a.addClass("hide");
                io.fadeOut(600);
                setTimeout(function() {
                    n_insert.css("display", "none");
                    c_a.css("display", "none");
                    postClientIp();
                }, 1000);
                // io 말고 n_insert 숨기고 visit_info 효과 보이기(n번째 방문이시네요)
            });
        }
    });

}
let v_i = $("#visit_info"),
    v_t = $(".visit_text"),
    v_n = $(".visit_name"),
    v_c = $(".visit_count");
function visit_object(visit_name, visit_count) {
    io.show();
    v_i.slideDown(600).css("display", "flex");
    v_n.text(visit_name);
    v_c.text(visit_count);

    setTimeout(function() {
        console.log("slide");
        v_i.slideUp(400);
        setTimeout(function() {
            v_i.css("display", "none");
            io.hide();
        }, 400);
    }, 2000);
}

console.log(client_ip);
function postClientIp() {
    // let n_inp_val = n_inp.val();
    let n_inp_val;
    // let client_ip;
    if (n_inp.val() !== "") {
        n_inp_val = n_inp.val();
    } else {
        n_inp_val = "";
    }


    $.ajax({
        type: "POST",
        url: "/ip",
        data: {"client_ip_give": client_ip, "client_name": n_inp_val},
        success: function (response) { // 성공하면
            if (response["result"] === "success") {
                console.log("ip_POST");
                getClientIp();
            }
        }
    })
}
postClientIp();
function getClientIp() {
    $.ajax({
        type: "GET",
        url: "/ip",
        data: {},
        success: function (response) { // 성공하면
            if (response["result"] === "success") {
                // client_ip
                // user_ip, user_visit, user_name
                let users = response["ip"],
                    u_ip_ary = [],
                    u_visit_ary = [],
                    u_name_ary = [];

                for (i = 0; i < users.length; i++) {
                    let user = users[i],
                        u_ip = user["user_ip"],
                        u_visit = user["user_visit"],
                        u_name = user["user_name"],
                        test_name = "";

                    u_ip_ary.push(u_ip)
                    u_visit_ary.push(u_visit)
                    u_name_ary.push(u_name)

                    if (u_ip === client_ip) {
                        console.log(u_name);
                        console.log(Object.keys(user).length)   // dict length
                        for (j = 0; j < Object.keys(user).length; j++) {
                            if (u_name === "user_" + j) {
                                console.log("test_name");
                                test_name = "user_" + j;
                                name_insert_object();
                            }
                        }
                        console.log(test_name);
                        if (u_name !== test_name) {
                            console.log(test_name);
                            // n번째 방문이시네요! 실행
                            visit_object(u_name, u_visit);
                        }
                    } else {
                        console.log("false");
                    }
                }

                console.log(u_ip_ary);
                console.log(u_visit_ary);
                console.log(u_name_ary);

                // if (u_ip_ary.includes(client_ip)) {
                //     console.log("true");
                //     // name_insert_object();
                // } else {
                //     console.log("false");
                // }

            }
        }
    })
}
getClientIp();

function postArticle() {
    let q_ig = $(".input-group");
    let k_name_val = "",
        e_name_val = "",
        country_val = "",
        importer_val = "",
        winery_val = "",
        min_date_val = "",
        max_date_val = "";

    function inp_val() {
        // switch!!!, GOOD!!!
        for (i = 0; i < q_ig.length; i++) {
            switch (q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1]) {
                case 'k_name_box':
                    k_name_val = $(".k_name").val().replaceAll(" ", "");
                    break;
                case 'e_name_box':
                    e_name_val = $(".e_name").val().toUpperCase().replaceAll(" ", "");
                    break;
                case 'country_box':
                    country_val = $(".country").val().replaceAll(" ", "");
                    break;
                case 'importer_box':
                    importer_val = $(".importer").val().replaceAll(" ", "");
                    break;
                case 'winery_box':
                    winery_val = $(".winery").val().toUpperCase().replaceAll(" ", "");
                    break;
                case 'date_box':

                    let min_year = $(".min_date_year"),
                        min_month = $(".min_date_month"),
                        min_day = $(".min_date_day"),
                        max_year = $(".max_date_year"),
                        max_month = $(".max_date_month"),
                        max_day = $(".max_date_day");
                    let min_month_val,
                        min_day_val,
                        max_month_val,
                        max_day_val;
                    // let date_ary_not_year = [min_month, min_day, max_month, max_day],
                    //     date_val_ary = [min_month_val, min_day_val, max_month_val, max_day_val];

                    // 리펙토링은 나중에
                    if (min_month.val().length === 1) {
                        min_month_val = "0" + min_month.val();
                    } else {
                        min_month_val = min_month.val();
                    }
                    if (min_day.val().length === 1) {
                        min_day_val = "0" + min_day.val();
                    } else {
                        min_day_val = min_day.val();
                    }
                    if (max_month.val().length === 1) {
                        max_month_val = "0" + max_month.val();
                    } else {
                        max_month_val = max_month.val();
                    }
                    if (max_day.val().length === 1) {
                        max_day_val = "0" + max_day.val();
                    } else {
                        max_day_val = max_day.val();
                    }

                    min_date_val = "20" + min_year.val() + "-" + min_month_val + "-" + min_day_val;
                    max_date_val = "20" + max_year.val() + "-" + max_month_val + "-" + max_day_val;

                    break;
                default:
                    break;
            }
        }
    }
    inp_val();

    console.log(q_ig.length);

    $.ajax({
        type: "POST",
        url: "/search",
        data: {"k_name_give": k_name_val, "e_name_give": e_name_val, "country_give": country_val, "importer_give": importer_val, "winery_give": winery_val, "min_date_give": min_date_val, "max_date_give": max_date_val},   // app.py로 보내기?, date 임시 제거
        success: function (response) { // 성공하면
            if (response["result"] === "success") {
                // alert(response["msg"]);
                // window.location.reload();
                console.log("search_POST");
                showArticles2();
            }
        }
    })
}

function showArticles2() {
    let q_ig = $(".input-group");
    // let k_name_val = "",
    //     e_name_val = "",
    //     country_val = "",
    //     importer_val = "",
    //     winery_val = "",
    //     min_date_val = "",
    //     max_date_val = "";
    //
    // function inp_val() {
    //     // switch!!!, GOOD!!!
    //     for (i = 0; i < q_ig.length; i++) {
    //         switch (q_ig.eq(i).find(".input_wrap").attr("class").split(" ")[1]) {
    //             case 'k_name_box':
    //                 k_name_val = $(".k_name").val().replaceAll(" ", "");
    //                 break;
    //             case 'e_name_box':
    //                 e_name_val = $(".e_name").val().toUpperCase().replaceAll(" ", "");
    //                 break;
    //             case 'country_box':
    //                 country_val = $(".country").val().replaceAll(" ", "");
    //                 break;
    //             case 'importer_box':
    //                 importer_val = $(".importer").val().replaceAll(" ", "");
    //                 break;
    //             case 'winery_box':
    //                 winery_val = $(".winery").val().toUpperCase().replaceAll(" ", "");
    //                 break;
    //             case 'date_box':
    //
    //                 let min_year = $(".min_date_year"),
    //                     min_month = $(".min_date_month"),
    //                     min_day = $(".min_date_day"),
    //                     max_year = $(".max_date_year"),
    //                     max_month = $(".max_date_month"),
    //                     max_day = $(".max_date_day");
    //                 let min_month_val,
    //                     min_day_val,
    //                     max_month_val,
    //                     max_day_val;
    //                 // let date_ary_not_year = [min_month, min_day, max_month, max_day],
    //                 //     date_val_ary = [min_month_val, min_day_val, max_month_val, max_day_val];
    //
    //                 // 리펙토링은 나중에
    //                 if (min_month.val().length === 1) {
    //                     min_month_val = "0" + min_month.val();
    //                 } else {
    //                     min_month_val = min_month.val();
    //                 }
    //                 if (min_day.val().length === 1) {
    //                     min_day_val = "0" + min_day.val();
    //                 } else {
    //                     min_day_val = min_day.val();
    //                 }
    //                 if (max_month.val().length === 1) {
    //                     max_month_val = "0" + max_month.val();
    //                 } else {
    //                     max_month_val = max_month.val();
    //                 }
    //                 if (max_day.val().length === 1) {
    //                     max_day_val = "0" + max_day.val();
    //                 } else {
    //                     max_day_val = max_day.val();
    //                 }
    //
    //                 min_date_val = "20" + min_year.val() + "-" + min_month_val + "-" + min_day_val;
    //                 max_date_val = "20" + max_year.val() + "-" + max_month_val + "-" + max_day_val;
    //
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // }
    // inp_val();

    $.ajax({
        type: "GET",
        url: "/search",
        data: {},
        success: function (response) {
            if (response['result'] === 'success') {

                let wines = response["wines"];
                let wines_result_ary = [];
                let num = 0,
                    count = 0,
                    max_result = 20;    // 임시(최대 출력 결과 갯수)
                // console.log(response["wines"]);

                // if ($(".k_name").val() == null && e_name_val == null && country_val == null && importer_val == null && winery_val == null && min_date_val == null && max_date_val == null) {
                if ($(".k_name").val() == null && $(".e_name").val() == null && $(".country").val() == null && $(".importer").val() == null && $(".winery").val() == null) {
                    // NOPE
                    alert("검색할 내용을 입력해주세요.");
                    console.log("검색할 내용을 입력해주세요.");
                } else {

                    // 함수들 글로벌로 빼주기(가독성)

                    for (i = 0; i < wines.length; i++) {
                        let wine = wines[i];
                        let k_name = wine["와인_이름_kr"];
                        let e_name = wine["와인_이름_en"];
                        let country = wine["제조국"];
                        let importer = wine["수입사"];
                        let winery = wine["와이너리"];
                        let date = wine["수입일"];

                        // console.log(k_name);

                        let html = `
                        <tr id="tr_${i + 1}">
                            <td>${k_name}</td>
                            <td>${e_name}</td>
                            <td>${country}</td>
                            <td>${importer}</td>
                            <td>${winery}</td>
                            <td>${date}</td>
                        </tr>
                    `;

                        if (num % max_result === 0) {
                            wines_result_ary.push([]);
                            if (num !== 0) {
                                count++;
                            }
                        }
                        wines_result_ary[count].push(html);
                        num++;
                    }
                    console.log(wines_result_ary)


                    // console.log(wines_result_ary.length)
                    // console.log("last_ary_number: " + wines_result_ary[wines_result_ary.length - 1].length);

                    // variable
                    // scrolling_view_bar
                    // let svb = $("#scrolling_view_bar");
                    let con = document.getElementById("container"),
                        svb = document.getElementById("scrolling_view_bar"),
                        vt = document.getElementById("val_text");
                    // form +q_ig
                    let fw = $(".form_wrap");
                    // table#content_box
                    let tw = $(".table_wrap"),
                        c_b = $("#content_box");
                    // div.page_btn_wrap
                    let pbw = $(".page_btn_wrap");

                    // page 5 초과일 때 화살표 버튼 생성하기
                    pbw.css("display", "flex");

                    let p_n_a = $(".btn_box:not(.num_wrap) > a.page_btn"),
                        n_w = $(".num_wrap"),
                        n_w_a,
                        m_pr = $(".max_prev"),
                        pr = $(".prev"),
                        nt = $(".next"),
                        m_nt = $(".max_next");

                    let ts,
                        page_num_btn_html,
                        sx,
                        wheel_bool = true,
                        tick,
                        tock;

                    // result group
                    c_b.empty();

                    for (i = 0; i < wines_result_ary[0].length; i++) {
                        c_b.append(wines_result_ary[0][i]);
                    }
                    // /result group

                    if ($("#content_box > tr").length === 0) {
                        $(".table_wrap").fadeOut(1000);
                        // NONE
                        alert("검색 결과를 찾을 수 없습니다.");
                        console.log("검색 결과를 찾을 수 없습니다.");
                    } else {
                        $(window).scrollTop(0);
                        $(".logo_form_wrap").addClass("top_fixed");
                        $(".home_btn").fadeIn(1000).on("click", home_btn_event);


                        // 검색이 안됨
                        // dm_a_refresh();


                        // scrolling_view_bar
                        document.addEventListener("scroll", scrolling_view_bar_event);

                        function scrolling_view_bar_event(event) {
                            let val = (window.pageYOffset / (con.offsetHeight - window.innerHeight)) * 100;

                            function tick_func() {
                                tick = setTimeout(() => $("#val_text").css("opacity", "0"), 1000);
                            }

                            function tock_func() {
                                $("#val_text").css("opacity", "1");
                                tock = clearTimeout(tick);
                            }

                            svb.style.width = val + "%";
                            vt.innerText = Math.ceil(val);

                            tock_func();
                            tick_func();

                        }

                        // /scrolling_view_bar


                        // logo_form_wrap
                        inp_add_cls();
                        inp_refresh();
                        // result inp down hidden, up show
                        // $(document).on("mousewheel DOMMouseScroll", fw_wheel_event);
                        // // $(document).on("scroll", fw_wheel_event);
                        // function fw_wheel_event(event) {
                        //     ts = fw;
                        //     let dy = event.originalEvent;
                        //
                        //     if (($(document).height() - window.innerHeight - 110) > $(document).scrollTop()) {
                        //         if (dy.deltaY > 0) ts.addClass("hide");
                        //         else ts.removeClass("hide");
                        //     } else ts.removeClass("hide");
                        // }
                        // js
                        window.__scrollPosition = document.documentElement.scrollTop || 0;
                        document.onscroll = () => {
                            let ts = document.getElementsByClassName("form_wrap")[0];
                            let _documentY = document.documentElement.scrollTop;
                            let _direction = _documentY - window.__scrollPosition >= 0 ? 1 : -1;

                            if (window.pageYOffset < (document.body.offsetHeight - window.innerHeight - 80)) {
                                if (_direction > 0) {
                                    ts.classList.add("hide");

                                    inp_hide_object();
                                } else ts.classList.remove("hide");
                            } else ts.classList.remove("hide");

                            window.__scrollPosition = _documentY; // Update scrollY
                        }


                        // /logo_form_wrap



                        // page_btn group
                        n_w.empty();

                        for (i = 1; i <= wines_result_ary.length; i++) {
                            if (i === 1) {
                                page_num_btn_html = `
                                    <a href="javascript:void(0)" class="page_btn num_btn active" value="${i}">
                                        ${i}
                                    </a>
                                `;
                            } else {
                                page_num_btn_html = `
                                    <a href="javascript:void(0)" class="page_btn num_btn" value="${i}">
                                        ${i}
                                    </a>
                                `;
                            }
                            n_w.append(page_num_btn_html);
                        }

                        if (wines_result_ary.length < 6) {
                            $(".prev_wrap").hide();
                            $(".next_wrap").hide();
                            $(".num_wrap").css("justify-content", "center");
                        } else {
                            $(".prev_wrap").show();
                            $(".next_wrap").show();
                            $(".num_wrap").css("justify-content", "flex-start");
                        }

                        n_w_a = $(".num_wrap > a.num_btn");

                        p_n_a.on("click", prev_next_btn_event);

                        function prev_next_btn_event(event) {
                            let tc = $(this).attr("class").split(" ")[1];
                            let move_val = (Number(n_w.css("width").replace("px", "")) + Number(n_w_a.css("margin-right").replace("px", ""))),
                                m_nt_scroll_val = (Number(n_w_a.css("width").replace("px", "")) * n_w_a.length + Number(n_w_a.css("margin-right").replace("px", "")) * (n_w_a.length - 1));

                            function tick_func() {
                                tick = setTimeout(() => n_w.scrollLeft(28 * (n_w.find(".active").attr("value") - 3)), 3000);
                            }

                            function tock_func() {
                                tock = clearTimeout(tick);
                            }

                            sx = n_w.scrollLeft();

                            if (tc === "max_prev") n_w.scrollLeft(0);
                            else if (tc === "prev") n_w.scrollLeft(sx - move_val);
                            else if (tc === "next") n_w.scrollLeft(sx + move_val);
                            else if (tc === "max_next") n_w.scrollLeft(m_nt_scroll_val);

                            tock_func();
                            tick_func();

                        }

                        n_w.on("mousewheel DOMMouseScroll", n_w_wheel_event);

                        function n_w_wheel_event(event) {
                            ts = $(this);
                            let dy = event.originalEvent;

                            function tick_func() {
                                tick = setTimeout(() => ts.scrollLeft(28 * (ts.find(".active").attr("value") - 3)), 2000);
                            }

                            function tock_func() {
                                tock = clearTimeout(tick);
                            }

                            event.preventDefault();     // document up&down scroll 방지

                            if (wheel_bool) {
                                if (dy.deltaY > 0) {
                                    sx = ts.scrollLeft();
                                    ts.scrollLeft(sx + ((24 + 4) * 5));
                                } else {
                                    sx = ts.scrollLeft();
                                    ts.scrollLeft(sx - ((24 + 4) * 5));
                                }

                                wheel_bool = false;
                                setTimeout(function () {
                                    wheel_bool = true;
                                }, 220);
                            }

                            tock_func();
                            tick_func();
                        }

                        function h_active_event() {
                            n_w.find("a.num_btn:not(.active)").off("mouseenter mouseleave").end().find("a.num_btn:not('.active')").on("mouseenter", function (event) {
                                $(this).addClass("h_active");
                            }).on("mouseleave", function (event) {
                                $(this).removeClass("h_active");
                            });
                        }

                        h_active_event();

                        $(".num_wrap > a.num_btn:not(.active)").on("click", function (event) {
                            ts = $(this);
                            let tv = ts.attr("value");

                            for (i = 0; i < ts.length; i++) {
                                n_w_a.removeClass("active");
                            }
                            ts.addClass("active");

                            n_w.scrollLeft(28 * (ts.attr("value") - 3));

                            // page_btn 누르면 페이지 하단에 머물게 하기?? 아니면 그대로 두기??

                            c_b.empty();

                            for (i = 0; i < wines_result_ary[tv].length - 1; i++) {
                                c_b.append(wines_result_ary[tv][i]);
                            }

                            h_active_event();
                        });
                        // /page_btn group

                        tw.fadeIn(1000).css({
                            "display": "flex",
                            "padding-top": "calc(142px + 16px)"     // 임시
                        });

                        // console.log(wines_result_ary);
                        // console.log(wines_result_ary[0][0]);
                    }
                }

                // console.log($("tr").length);
            }
        }
    });
}

// 리팩토링 none
// function showArticles() {
//     console.log("showArticles_on");
//     let q_ig = $(".input-group");
//     let k_name_val = "",
//         e_name_val = "",
//         country_val = "",
//         importer_val = "",
//         winery_val = "",
//         date_val = "", date_min_val, date_max_val;
//     // let val_name_ary = [k_name_val, e_name_val, country_val, importer_val, winery_val, date_val];
//     // let inp_cls_ary2 = ["k_name", "e_name", "country", "importer", "winery", "date"];
//     // 여기 문제, 요소(input)를 찾을 수 없어서 오류
//     // console.log(iw_cls_ary);   // 글로벌 변수로 빼내 주어서 사용 가능
//     function inp_val() {
//         console.log("inp_val_on");
//         // for (i = 0; i < q_ig.length; i++) {
//         //     for (j = 0; j < inp_cls_ary2.length; j++) {
//         //
//         //     if (inp_cls_ary.includes(q_ig.eq(i).find(".form-control").attr("class").split(" ")[1])) {        // 2
//         //         if (q_ig.eq(i).find(".form-control").attr("class").split(" ")[1].includes(inp_cls_ary2[j])) {
//         //             console.log("true");
//         //             // .toUpperCase()를 따로 줘야하나??, 한글은 적용이 안돼서 상관이 없을 듯??????
//         //             // 배열로 변수적용이 안되는 듯
//         //             // val_name_ary[j] = $(inp_cls_ary2[j]).val().toUpperCase().replace(" ", "");
//         //             k_name_val = $(inp_cls_ary2[j]).val().toUpperCase().replace(" ", "");
//         //         } else {
//         //             console.log(inp_cls_ary2[j] + "_false");
//         //             // val_name_ary[j] = $(".search_btn").val();
//         //             k_name_val = "";
//         //         }
//         //
//         //     }
//         // }
//
//         // switch!!!, GOOD!!!
//         for (i = 0; i < q_ig.length; i++) {
//             // if (inp_cls_ary.includes(q_ig.eq(i).find(".form-control").attr("class").split(" ")[1])) {
//             // // if (q_ig.eq(i).find(".form-control").attr("class").split(" ")[1].includes("k_name")) {
//             //     console.log("true");
//             //     k_name_val = $("k_name").val().toUpperCase().replace(" ", "");
//             // } else {
//             //     console.log("false");
//             //     k_name_val = "";
//             // }
//
//             // switch (q_ig.eq(i).find(".form-control").attr("class").split(" ")[1]) {
//             switch (q_ig.eq(i).find(".input_wrap:not(.date_box) > .form-control").attr("class").split(" ")[1]) {
//                 case 'k_name':
//                     k_name_val = $(".k_name").val().replace(" ", "");
//                     break;
//                 case 'e_name':
//                     e_name_val = $(".e_name").val().toUpperCase().replace(" ", "");
//                     break;
//                 case 'country':
//                     country_val = $(".country").val().replace(" ", "");
//                     break;
//                 case 'importer':
//                     importer_val = $(".importer").val().replace(" ", "");
//                     break;
//                 case 'winery':
//                     winery_val = $(".winery").val().toUpperCase().replace(" ", "");
//                     break;
//                 case 'date':
//                     // not yet
//                     date_val = "";
//                     break;
//                 default:
//                     break;
//                 // default 가 없어도 되나???
//             }
//
//         }
//
//     }
//     inp_val();
//
//     console.log(k_name_val, e_name_val, country_val, importer_val, winery_val, date_val);
//     // k_name_val = q_ig.eq(0).find(q_ig.find(".form-control").attr("class").split(" ")[1]).val().replace(" ", "");     // 이런식으로???, XXX
//     // k_name_val = $(".k_name").val().replace(" ", "");
//     // e_name_val = $(".e_name").val().toUpperCase().replace(" ", "");
//     // country_val = $(".country").val().replace(" ", "");
//     // importer_val = $(".importer").val().replace(" ", "");
//     // winery_val = $(".winery").val().toUpperCase().replace(" ", "");
//     // date_min_val = $(".date_min").val();
//     // date_max_val = $(".date_max").val();
//
//     $.ajax({
//         type: "GET",
//         url: "/wine",
//         data: {},
//         success: function (response) {
//             console.log("ajax_on");
//             let wines = response["wines"];
//             let num = 0;
//
//             // 일단 수입일은 제외(||)
//             // if (k_name_val === "" && e_name_val === "" && country_val === "" && importer_val === "" && winery_val === "" && date_min_val === "" && date_max_val === "") {        // thaed display:none, 검색결과가 있으면 다시 display: block
//             if (k_name_val === "" && e_name_val === "" && country_val === "" && importer_val === "" && winery_val === "") {
//                 alert("검색할 내용을 입력해주세요.");
//             } else {
//                 for (let i = 0; i < wines.length; i++) {
//                     let wine = wines[i];
//                     let k_name = wine["와인_이름_kr"];
//                     let e_name = wine["와인_이름_en"];
//                     let country = wine["제조국"];
//                     let importer = wine["수입사"];
//                     let winery = wine["와이너리"];
//                     let date = wine["수입일"];
//
//                     // date_range_calculation
//                     // let date_boolean;
//                     // let min = date_min_val.split("-");
//                     // let date_array = date.split("-");
//                     // let max = date_max_val.split("-");
//                     // if (Number(min[0]) === Number(date_array[0])) {
//                     //     if (Number(min[1]) === Number(date_array[1])) {
//                     //         if (Number(min[2]) <= Number(date_array[2])) {
//                     //             // console.log("min_day_true");
//                     //             date_boolean = true;
//                     //         } else {
//                     //             // console.log("min_day_false");
//                     //             date_boolean = false;
//                     //         }
//                     //     } else if (Number(min[1]) < Number(date_array[1])) {
//                     //         // console.log("min_month_true");
//                     //         date_boolean = true;
//                     //     } else {
//                     //         // console.log("min_month_false");
//                     //         date_boolean = false;
//                     //     }
//                     // } else if (Number(min[0]) < Number(date_array[0]) < Number(max[0])) {
//                     //     // console.log("date_tear_true");
//                     //     date_boolean = true;
//                     // } else if (Number(date_array[0]) === Number(max[0])) {
//                     //     if (Number(date_array[1]) === Number(max[1])) {
//                     //         if (Number(date_array[2]) <= Number(max[2])) {
//                     //             // console.log("max_day_true");
//                     //             date_boolean = true;
//                     //         } else {
//                     //             // console.log("max_day_false");
//                     //             date_boolean = false;
//                     //         }
//                     //     } else if (Number(date_array[1]) < Number(max[1])) {
//                     //         // console.log("max_month_true");
//                     //         date_boolean = true;
//                     //     } else {
//                     //         // console.log("max_month_false");
//                     //         date_boolean = false;
//                     //     }
//                     // } else {
//                     //     // console.log("date_year_false");
//                     //     date_boolean = false;
//                     // }
//
//                     // 여기도 문제, boolean 값을 얻지 못해서
//                     // if (k_name.replace(" ", "").includes(k_name_val) && e_name.replace(" ", "").includes(e_name_val) && country.replace(" ", "").includes(country_val) && importer.replace(" ", "").includes(importer_val) && winery.replace(" ", "").includes(winery_val) || date_boolean) {
//                     if (k_name.replace(" ", "").includes(k_name_val) && e_name.replace(" ", "").includes(e_name_val) && country.replace(" ", "").includes(country_val) && importer.replace(" ", "").includes(importer_val) && winery.replace(" ", "").includes(winery_val)) {
//                         let html = `
//                             <tr id="tr_${num}">
//                                 <td>${k_name}</td>
//                                 <td>${e_name}</td>
//                                 <td>${country}</td>
//                                 <td>${importer}</td>
//                                 <td>${winery}</td>
//                                 <td>${date}</td>
//                             </tr>
//                         `;
//                         $("#content_box").append(html);
//                         num++;
//                     }
//
//                     console.log("GET");
//
//                     // $("#content_box").append(html);
//                     // console.log(k_name);
//                     // window.location.reload();    // 이미 있다??
//                 }
//
//                 if ($("#content_box > tr").length === 0) {
//                     alert("검색 결과를 찾을 수 없습니다.");
//                     console.log("nothing");
//                 }
//             }
//
//             // console.log(wines)       // 확인
//
//             // if (response["result"] == "success") {
//             //     alert(response["msg"]);
//             // }
//         }
//     })
// }