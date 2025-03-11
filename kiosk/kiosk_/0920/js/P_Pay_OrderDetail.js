function chgColor(n) {
    const all = document.getElementById('all');
    const three = document.getElementById('three');
    const six = document.getElementById('six');
    const twelve = document.getElementById('twelve');
    switch (n) {
        case 1:
            all.setAttribute("class", "btn_black btn_middle");
            three.setAttribute("class", "btn_white btn_middle");
            six.setAttribute("class", "btn_white btn_middle");
            twelve.setAttribute("class", "btn_white btn_middle");
            break;
        case 3:
            three.setAttribute("class", "btn_black btn_middle");
            all.setAttribute("class", "btn_white btn_middle");
            six.setAttribute("class", "btn_white btn_middle");
            twelve.setAttribute("class", "btn_white btn_middle");
            break;
        case 6:
            six.setAttribute("class", "btn_black btn_middle");
            all.setAttribute("class", "btn_white btn_middle");
            three.setAttribute("class", "btn_white btn_middle");
            twelve.setAttribute("class", "btn_white btn_middle");
            break;
        case 12:
            twelve.setAttribute("class", "btn_black btn_middle");
            all.setAttribute("class", "btn_white btn_middle");
            three.setAttribute("class", "btn_white btn_middle");
            six.setAttribute("class", "btn_white btn_middle");
            break;
    };
};