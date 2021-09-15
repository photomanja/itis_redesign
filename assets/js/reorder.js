
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOMContentLoaded");
    const targetNode = document.getElementById('z43-newslist');

    const origNodeOrder = targetNode.querySelectorAll('.z43-news-item');
    const reorder = () => {
        origNodeOrder.forEach(node => {
            targetNode.appendChild(node);
        });
        let item = targetNode.querySelector('.z43-news-item'); // first item
        let parentRect = targetNode.getBoundingClientRect();
        let lastTop;
        let lastGap = 0;
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
    let reorderTimeoutId = null;
    const scheduleReorder = () => {
        if (reorderTimeoutId) {
            clearTimeout(reorderTimeoutId);
        }
        reorderTimeoutId = setTimeout(reorder, 200);
        reorder();
    };
    scheduleReorder();
    window.addEventListener('resize', scheduleReorder);
});