<template>
  <div class="search">
    <NavBar>
      <div slot="center">搜索</div>
    </NavBar>
    <div class="content">
      <div class="top">
        <van-form label-width="auto">
          <van-field readonly is-link name="picker" :value="city" label="所在城市" placeholder="请选择城市"
            @click="showPicker = true" :error-message="verification.city" @input="VerifyCellCity" />
          <van-action-sheet v-model="showPicker" title="请选择您所在城市">
            <div class="city-content">
              <div class="title">选择省份/城市</div>
              <div class="cities">
                <div v-if="!provinceId">
                  <div v-for="item in provinceList" @click="getCityList(item.id)">
                    <span>{{item.letter}}</span>{{item.value}}
                  </div>
                </div>
                <div v-else>
                  <div v-for="item in cityList"
                    @click="city=item.value;query.cityId=item.id;showPicker=false;provinceId=''">
                    <span>{{item.letter}}</span>
                    {{item.value}}
                  </div>
                </div>
              </div>
            </div>
          </van-action-sheet>
          <van-field class="keyword" v-model="query.key" label="开户行关键字" placeholder="请输入" :error-message="verification.legalName"
            @blur="VerifyCellLegalName">
            <template #button>
              <van-button size="small" type="danger" @click="branchBankList">搜索</van-button>
            </template>
          </van-field>
        </van-form>

      </div>
      <div class="result">
        <div class="title">搜索结果</div>
        <div v-if="list.length==0"  class="none">暂无数据</div>
        <div v-else class="item" v-for="item in list" :key="item.code" @click="$router.push({path:'/applyNetwork',query:{bankNo:item.code,bankBranchName:item.bankBranchName}})">{{item.bankBranchName}}</div>

      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import region from "assets/js/region.js";
  import { isPhone, formatDate, chineseLetter, getStore } from "assets/js/utils.js";

  export default {
    data() {
      return {
        showPicker: false,
        verification: {},
        query: {

        },
        city: '',
        provinceId: '',
        provinceList: [],
        cityList: [],
        list: []
      }
    },
    created() {
      this.provinceList = chineseLetter(this.objToArr(86), 'value');
    },
    methods: {
     
      branchBankList() {
        this.$http('/orderlist/branchBankList', this.query).then(res => {
          if (res.code == 200) {
            this.list = res.data.branchBankList;
          } else if (res.code == 500) {
            this.$toast.fail(res.msg)
          }
        })
      },
      //对象转数组
      objToArr(provinceId) {
        let arr = [];
        for (const key in region[provinceId]) {
          if (region[provinceId].hasOwnProperty.call(region[provinceId], key)) {
            arr.push({ id: key, value: region[provinceId][key] });
          }
        }
        return arr;
      },
      //获取城市列表
      getCityList(id, value) {
        console.log(value)
        this.provinceId = id;

        this.cityList = chineseLetter(this.objToArr(id), 'value');
      },
      VerifyCellCity() {

      },
      VerifyCellLegalName() {

      },
      onFinish() {

      }
    },
    components: {
      NavBar,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .search {
    height: 100%;
  }
.keyword{
  display: flex;
  align-items: center;
}
.none{
  font-size: .75rem;
      padding: .75rem 0;
      color: #4c4c4c;
      text-align: center;
}
  .content {
    background-color: #F2F2F2;
    min-height: calc(100% - 44px);
    padding: 20px;

    .top {
      background: $fc;
      border-radius: 10px;

    }

    .result {
      margin-top: 10px;
      padding: .25rem 1rem;
      background: #FFFFFF;
      border-radius: 10px;
      box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
    }

    .title,
    .item {
      font-size: .75rem;
      padding: .75rem 0;
      border-bottom: 1px solid #EEEEEE;
    }

    .title {
      color: #4c4c4c;
    }

    .item {
      color: #333;
    }

    .item:last-child {
      border: none;
    }

    .city-content {
      padding: 0 1rem 1rem;
      height: 20rem;
      background: #FFFFFF;
      border-radius: 0.5rem 0.5rem 0rem 0rem;

      .title {
        @include sc(.6rem, #aaa);

      }



      .province,
      .city {
        @include sc(.7rem, #333);
      }

      .cities {
        /* margin-top: .85rem; */

        div {
          @include sc(.7rem, #333);
          line-height: 1.7rem;

          span {
            @include sc(.6rem, #aaa);
            margin-right: .5rem;
            width: .4rem;
            display: inline-block;

          }
        }
      }
    }
  }
</style>