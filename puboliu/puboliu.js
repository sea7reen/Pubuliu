window.onload = function () {
    img_location("container", "box");
    var img_data;
    img_data = {
        "data": [{
            "src": "IMG_3723.JPG"
        }, {
            "src": "IMG_3694.JPG"
        }, {
            "src": "IMG_3640.JPG"
        }, {
            "src": "IMG_3684.JPG"
        }, {
            "src": "IMG_3713.JPG"
        }, {
            "src": "IMG_3743.JPG"
        }]
    };
    window.onscroll = function () {
        if (check_scroll()) {
            var dparent = document.getElementById("container");
            for (var i = 0; i < img_data.data.length; i++) {
                var dcontent = document.createElement("div");
                dcontent.className = "box";
                dparent.appendChild(dcontent);
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                dcontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = "/Users/sea7reen/Pictures/草莓！/" + img_data.data[i].src;
                boximg.appendChild(img);
            }
        }
        img_location("container", "box");
    }
}

function check_scroll() {
    var dparent = document.getElementById("container");
    var dcontent = get_child_element(dparent, "box");
    var last_content_height = dcontent[dcontent.length - 1].offsetTop;
    var scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
    var page_height = document.documentElement.clientHeight || document.body.clientHeight;
    if (last_content_height < scroll_top + page_height) {
        return true;
    }
}

function img_location(parent, content) {
    var dparent = document.getElementById(parent);
    var dcontent = get_child_element(dparent, content);
    var dec_width = get_width(dparent, dcontent);
    var image_location = min_image_location(dec_width, dcontent);
}

function get_child_element(parent, content) {
    var content_array = [];
    var all_content = parent.getElementsByTagName("*");
    for (var i = 0; i < all_content.length; i++) {
        if (all_content[i].className == content) {
            content_array.push(all_content[i])
        }
    }
    return content_array;
}

function get_width(dparent, dcontent) {
    var img_width = dcontent[1].offsetWidth;
    var win_width = document.documentElement.clientWidth;
    var num_width = Math.floor(win_width / img_width);
    dparent.style.cssText = "width:" + img_width * num_width + "px; margin:0 auto";
    return num_width;
}

function min_image_location(dec_width, dcontent) {
    var box_height_array = [];
    for (var i = 0; i < dcontent.length; i++) {
        if (i < dec_width) {
            box_height_array[i] = dcontent[i].offsetHeight;
        } else {
            var min_height = Math.min.apply(null, box_height_array);
            var min_index = get_min_height(box_height_array, min_height);
            dcontent[i].style.position = "absolute";
            dcontent[i].style.top = min_height + "px";
            dcontent[i].style.left = dcontent[min_index].offsetLeft + "px";

            box_height_array[min_index] = box_height_array[min_index] + dcontent[i].offsetHeight;
        }
    }
}

function get_min_height(box_height_array, min_height) {
    for (var i in box_height_array) {
        if (box_height_array[i] == min_height) {
            return i;
        }
    }
}
