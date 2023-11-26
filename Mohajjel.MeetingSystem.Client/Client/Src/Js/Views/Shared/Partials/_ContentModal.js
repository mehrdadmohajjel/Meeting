var motorsazanClient = motorsazanClient || {};
motorsazanClient.contentModal = (function () {

    var dom = null;
    var tools = motorsazanClient.tools;
    var state = {
        modalsList: []
    };

    function ajaxShow(title, url, parameters, callback, showInMedium, showInMaximize) {
        showInMedium = showInMedium || false;
        showInMaximize = showInMaximize || false;
        callback = callback || null;

        motorsazanClient.connector.post(url, parameters)
            .then(async function (response) {
                await showModal(title, response, showInMedium, showInMaximize);
                if (callback) callback();
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    function clientShow(title, content, showInMedium, showInMaximize) {
        showInMedium = showInMedium || false;
        showInMaximize = showInMaximize || false;
        showModal(title, content, showInMedium, showInMaximize);
    }

    function handleEscKeyPressByUser(event) {
        var escKeyCode = 27;
        var isEscPressed = event.keyCode === escKeyCode;

        if (isEscPressed) {
            hideLastModal();
            $('body').off('keydown');
        }
    }

    function hideAllModal() {
        dom.contentModalsWrapper.html("");
        tools.unLockBodyScroll();
    }

    function hideById(id) {
        var modal = $("#" + id);
        modal.remove();
        state.modalsList = state.modalsList.filter(item => item != id);

        if (state.modalsList.length == 0) tools.unLockBodyScroll();
    }

    function hideLastModal() {
        if (state.modalsList.lenght == 0) return;

        var lastId = state.modalsList.pop();
        hideById(lastId);
    }

    function init() {
        dom = {
            contentModalsWrapper: $("#contentModalsWrapper")
        };
    }

    function showModal(title, contentHtml, showInMedium, showInMaximize) {
        showInMaximize = showInMaximize || false;
        showInMedium = showInMedium || false;

        var modalBaseClass = "content-modal content-modal--active ";
        if (showInMaximize) modalBaseClass += " content-modal--maximize";
        var formClass = "content-modal__form";
        if (showInMedium) formClass += " content-modal__form--medium";

        var modelScrollClass = "content-modal__body-scroll col-xs-12 col-md-12 col-lg-12";
        if (showInMedium) modelScrollClass += " content-modal__body-scroll--medium";

        var id = "contentModal_" + Date.now();

        var modal = '<section class="' + modalBaseClass + '" id="' + id + '" tabindex="0">';
        modal += '<div class="' + formClass + '">';

        modal += '<div class="content-modal__header" >';
        modal += '<button class="content-modal__header-btn content-modal__header-btn--close" >&times;</button>';
        modal += '<button class="content-modal__header-btn content-modal__header-btn--maximize" >';
        modal += '<img src="/Client/Images/window.svg" class="content-modal__header-btn__icon" />';
        modal += '</button>';
        modal += title;
        modal += '</div>';

        modal += '<div class="content-modal__body">';
        modal += '<div class="' + modelScrollClass + '"></div>';
        modal += '</div>';

        modal += '</div>';
        modal += '</section>';

        var modalAsJqueryNode = $(modal);

        $(".content-modal__body-scroll", modalAsJqueryNode).html(contentHtml);

        $(".content-modal__header-btn--close", modalAsJqueryNode).click(function () { hideById(id); });
        $(".content-modal__header-btn--maximize", modalAsJqueryNode).click(function () { toggleById(id); });

        dom.contentModalsWrapper.append(modalAsJqueryNode);

        state.modalsList.push(id);
        tools.lockBodyScroll();

        $("body").keydown(handleEscKeyPressByUser);
        $(`#${id}`).focus();
    }

    function toggleById(id) {
        var modal = $("#" + id);
        modal.toggleClass("content-modal--maximize");
    }

    $(document).ready(init);

    return {
        ajaxShow: ajaxShow,
        clientShow: clientShow,
        hideModal: hideLastModal,
        hide: hideLastModal,
        hideAllModal: hideAllModal
    }

})();