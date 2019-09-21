<script>
export default {
  name: 'TextParser',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      startTag: '†',
      endTag: '‡',
      tagMap: undefined,
      elements: []
    }
  },
  beforeMount(){
    this.tagMap = Object.freeze({
      null: {
        tag: 'span'
      },
      b: {
        tag: 'b',
        area: true,
      },
      i:  {
        tag: 'i',
        area: true,
      },
      color: {
        tag: 'span',
        area: true,
        dataObj: {
          style: {
          },
        },
      },
      trUp: {
        tag: 'span',
        dataObj: {
          style: {
            color: 'red',
            // fontSize: '14px',
          },
        },
        slot: '\u25B2', //25B4
      },
      trDown: {
        tag: 'span',
        dataObj: {
          style: {
            color: 'red',
            // fontSize: '14px',
          },
        },
        slot: '\u25BC', //25BE
      },
      br: {
        tag: 'br',
      },
      trash: {
        tag: 'i',
        dataObj: {
          class: 'fas icon icon-recycle_bin',
          attrs: {
            title: this.$t('Products.Signals.BuyOnBottom')
          },
        },
      },
      chart_up: {
        tag: 'i',
        dataObj: {
          class: 'fas fa-chart-line',
          style: {
            color: 'red',
          },
        },
      },
      chart: {
        tag: 'i',
        dataObj: {
          class: 'fas icon icon-chart',
        },
      },
      top: {
        tag: 'i',
        dataObj: {
          class: 'fas icon icon-top',
        },
      },
      signal_strength: {
        tag: 'i',
        dataObj: {
          class: 'fas icon icon-signal_strength',
        },
      },
    })
  },
  render: function (createElement) {
    return createElement( 'div', this.parse(createElement, this.text) )
  },
  methods: {
    parse(createElement, tail){
      let elements = []
      let startTagIndex = tail.indexOf(this.startTag)
      while(startTagIndex > -1){
        let plainText = tail.substr(0,startTagIndex)
        if(plainText.length)
          elements.push(createElement('span',plainText))
        let endTagIndex = tail.indexOf(this.endTag)
        let tagEl = tail.substring(startTagIndex+1, endTagIndex)
        let tagText = undefined
        let tagElColor = undefined
        if(tagEl.indexOf(':')>-1){
          tagElColor = tagEl.substr(tagEl.indexOf(':')+1)
          tagEl = tagEl.substr(0,tagEl.indexOf(':'))
        }
        let tagItem = this.tagMap[tagEl] || this.tagMap.null
        if(tagItem.area){
          tagText = tail.substring(endTagIndex + 1, tail.indexOf(this.endTag, endTagIndex + 1))
          endTagIndex = tail.indexOf(this.endTag, endTagIndex + 1)
        }
        tail = tail.substr(endTagIndex+1)
        startTagIndex = tail.indexOf(this.startTag)
        if(tagElColor !== undefined){
          elements.push(createElement(tagItem.tag, {style:{color: tagElColor}}, tagItem.slot?tagItem.slot:tagText))
        } else {
          elements.push(createElement(tagItem.tag, Object.assign({},tagItem.dataObj), tagItem.slot?tagItem.slot:tagText))
        }
      }
      elements.push(createElement('span',tail))
      return elements
    }
  },
}
</script>
<style>
/* .icon::before {
  display: inline-flex;
  width: 20px;
  height: 20px;
} */
.icon-chart::before {
  content: url('/images/chart.png');
}
.icon-top::before {
  content: url('/images/top.png');
}
.icon-signal_strength::before {
  content: url('/images/signal_strength.png');
}
.icon-recycle_bin::before {
  content: url('/images/trash-ubuntu.png');
}
</style>