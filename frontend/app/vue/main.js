var bus = new Vue({

})

var sortMixin = {
    methods: {
        sort(tagArray, reverse) {
            tagArray.sort(function(a,b){
                  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }

                  // names must be equal
                  return 0;
            })

            if(reverse == true || this.clicker % 2 == 1 ) {
                tagArray.reverse();
            }
            return tagArray
        }
    }

};

var tagApp = new Vue({
    el: '#sidebar',
    data: {
        searchValue: 'tree',
        tags: [],
        things: {},
        clicker: 0
    },
    created(){
        this.loadTags()
    },
    mixins: [
        sortMixin
    ],
    methods: {

        search(value) {
            console.log(this.searchValue == value)
            console.log('search', value)


        },

        loadTags() {
            $.getJSON('/vue/tags.json',
                this.loadTagsHandler.bind(this)
                )
        },

        toggleReverse(){
            this.clicker += 1
        },

        loadTagsHandler(data) {
            this.tags = data;
        },

        selectTag(item){
            console.log('selected', item)
            bus.$emit('selected-tag', item)
        }
    }
})


var contentApp = new Vue({
    el: '#content'
    , data: {
        item: {},
        bookmarks: []
    }
    , mounted(){
        bus.$on('selected-tag', this.selectedTagHandler)
    },
    mixins: [
        sortMixin
    ]
    , methods: {
        selectedTagHandler(item) {
            this.item = item
        },

        loadBookmarks() {
            $.getJSON('/vue/bookmarks.json',
                this.loadBookmarksHandler.bind(this)
                )
        },

        loadBookmarksHandler(data) {
            this.bookmarks = data;
        },
    }
})
