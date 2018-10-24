import { store } from '_/vuex/store';

/**
 * Sets the favicon to loading state
 *
 * @param   {Boolean}  isLoading
 * @return  {void}
 */
export const faviconLoading = (isLoading) => {

    const $defaultIcon = createImgElement('defaultIcon', defaultIcon);

    const $loadingIcon = createImgElement('loadingIcon', loadingIcon);

    const favicon = new Favico({
        animation:'fade',
    });

    if (isLoading) {
        favicon.image($loadingIcon);

        return;
    }

    favicon.image($defaultIcon);


    setTimeout(() => {
        const faviconBadge = new Favico({
            animation:'fade',
        });

        const badge = store.state.notification.notificationsBadge;

        faviconBadge.badge(badge);
    }, 1000);
};

/**
 * Creates an img element to be used as the source for the images
 *
 * @param   {string}  id
 * @param   {string}  data
 * @return  {object}
 */
const createImgElement = (id, data) => {
    if($(`#${id}`).length) {
        return $(`#${id}`)[0];
    }

    let $element = $('<img>');

    $element.attr('id', id);

    $element.attr('src', data);

    $element.css('display', 'none');

    $('body').prepend($element);

    return $(`#${id}`)[0];
};

const defaultIcon = 'data:image/png;base64,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';

const loadingIcon = 'data:image/png;base64,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';
