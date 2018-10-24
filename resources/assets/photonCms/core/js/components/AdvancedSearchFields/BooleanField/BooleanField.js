import _ from 'lodash';

import Vue from 'vue';

import { store } from '_/vuex/store';

const BootstrapSwitch = Vue.component(
        'BootstrapSwitch',
        require('_/components/FieldTypes/BootstrapSwitch/BootstrapSwitch.vue')
    );

export default {
    /**
     * Define props
     *
     * @type  {Object}
     */
    props: {
        advancedSearchName: {
            required: true,
            type: String,
        },
        disabled: {
            type: Boolean,
        },
        id: {
            required: true,
            type: Number,
        },
        label: {
            required: true,
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
        refreshFields: {
            type: Number,
        },
    },

    /**
     * Define components
     *
     * @type  {Object}
     */
    components: {
        BootstrapSwitch,
    },

    /**
     * Set the computed properties
     *
     * @type {object}
     */
    computed: {
        /**
         * advancedSearch model getter
         *
         * @return  {object}
         */
        advancedSearch () {
            const getterName = `${this.advancedSearchName}/${this.advancedSearchName}`;

            return this.$store.getters[getterName];
        },

        /**
         * Gets the value
         *
         * @return  {string}
         */
        value () {
            const path = `payload.filter.${this.name}.equal`;

            if (_.has(this.advancedSearch, path)) {
                return this.advancedSearch.payload.filter[this.name].equal;
            }

            return null;
        }
    },

    /**
     * Set the methods
     *
     * @type  {Object}
     */
    methods: {
        /**
         * Define a method that runs on change event
         *
         * @param   {string}  options.name
         * @param   {string}  options.value
         * @return  {void}
         */
        onChange ({ name, value }) {
            store.dispatch(`${this.advancedSearchName}/updateFilterValue`, { fieldName: name, value });
        },

        /**
         * Toggles the resetRefreshFields data property in order to force refresh of the RefreshFields component
         *
         * @return  {void}
         */
        toggleResetRefreshFields () {
            this.refreshFields = moment().valueOf();
        }
    },
};
