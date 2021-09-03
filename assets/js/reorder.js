
document.addEventListener("DOMContentLoaded", function(event) {
    
    const targetNode = document.getElementById('z43-newslist');
    const reorder = () => {
        let item = targetNode.querySelector('.z43-news-item'); // Get the first item
        let parentRect = targetNode.getBoundingClientRect();
        let lastTop;
        let lastGap;
        while (item) {
            let itemRect = item.getBoundingClientRect();
            if (itemRect.top > lastTop
                && lastGap > 0){
                let iitem = item.nextElementSibling;
                while (iitem) {
                    let iitemRect = iitem.getBoundingClientRect();
                    if (iitemRect.width < itemRect.width){
                        item.before(iitem);
                        break;
                    }
                    iitem = iitem.nextElementSibling;
                }
            }
            lastTop = itemRect.top;
            lastGap = parentRect.right - itemRect.right;
            item = item.nextElementSibling;
        }
    };
    window.setTimeout(reorder,1);
    window.addEventListener('resize', reorder);
});