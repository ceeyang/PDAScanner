<template>
<div class="vue-dropdown-ext" :class="themestyle" v-show-extend="show">
    <div class="search-module clearfix" v-show="length">
        <input class="search-text" @keyup='search($event)' :placeholder="placeholder" />
        <span class="glyphicon glyphicon-search search-icon"></span>
    </div>
    <ul class="list-module" v-show="length" :style="{maxHeight:maxH+'px'}">
        <li v-for="(item,index) in datalist" @click="appClick(item,$event)" :key="index" :title="item.name">
            <span v-if="addIcon" :class="iconClass"></span> :style="itemTextStyle">{{item.name}}
            </span>
            <span v-if="statusIconType == 'text' && hasStatus" :class="item.statusClass">{{item.statusText}}</span> :class="item.statusClass">
            </span>
        </li>
    </ul>
    <div class="tip__nodata" v-show="!datalist.length">{{nodatatext}}</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            _datalist: this.itemlist.concat(),
            datalist: this.itemlist.concat(),
            length: this.itemlist.length
        }
    },
    props: {
        'show': { //用于外部控制组件的显示/隐藏
            type: Boolean,
            default: true
        },
        'itemlist': Array,
        'placeholder': String,
        'nodatatext': String,
        'themestyle': {
            type: String,
            default: 'default-theme'
        },
        'item-text-style': {
            type: Object,
            default: function() {
                return {
                    width: '80%'
                }
            }
        },
        'add-icon': {
            type: Boolean,
            default: true
        },
        'icon-class': {
            type: String,
            default: ''
        },
        'has-status': {
            type: Boolean,
            default: false
        },
        'status-icon-type': {
            type: String,
            default: 'text' //text or icon
        },
        'max-h': {
            type: Number,
            default: 200
        }
    },
    directives: {
        'show-extend': function(el, binding, vnode) { //bind和 update钩子
            let value = binding.value,
                searchInput = null;
            if (value) {
                el.style.display = 'block';
            } else { //隐藏后，恢复初始状态
                el.style.display = 'none';
                searchInput = el.querySelector(".search-text");
                searchInput.value = '';
                //还原渲染数据
                vnode.context.datalist = vnode.context.itemlist;
            }
        }
    },
    methods: {
        appClick: function(data, event) {
            this.$emit('item-click', data, event);
            console.log('///');
        },
        search: function(e) {
            let vm = this,
                searchvalue = e.currentTarget.value;
            vm.datalist = vm.$data._datalist.filter(
                function(item, index, arr) {
                    return item.name.indexOf(searchvalue) != -1;
                });
        },
        statusIconClass: function(status) {
            let statusClass = '';
            return statusClass;
        }
    },
    mounted: function() {

    }
}
</script>

<style lang="scss" scoped>
.text-overflow__style {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.vue-dropdown-ext {

    .search-module {
        position: relative;
        .search-text {
            width: 100%;
            height: 30px;
            padding-right: 2em;
            padding-left: 0.5em;
            box-shadow: none;
            border: 1px solid #ccc;
            background: #fff;
            &:focus {
                border-color: #2198f2;
            }
        }

        .search-icon {
            position: absolute;
            top: 24%;
            right: 0.5em;
            color: #aaa;
        }

    }

    .list-module {
        overflow: auto;
        li {
            position: relative;
            margin-top: 0.5em;
            padding: 0.5em;
            border: 1px solid #ccc;
            white-space: nowrap;

            & > span {
                display: inline-block;
                vertical-align: middle;
            }

        }
    }

    .tip__nodata {
        font-size: 12px;
        margin-top: 1em;
    }

    &.default-theme {
        .list-module li {
            &:hover {
                cursor: pointer;
                border-color: #00a0e9;
            }

            &.active {
                border-color: #00a0e9;
                color: #00a0e9;
            }
        }

    }
}
</style>
