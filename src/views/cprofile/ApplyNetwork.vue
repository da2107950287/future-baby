<template>
  <div class="audition">
    <NavBar>
      <div slot="center">网点申请</div>

    </NavBar>
    <div class="content">
      <div class="tip" v-if="query.merId">
        <span>审核状态：</span>
        <span v-if="query.state==1">待审核</span>
        <span v-else-if="query.state==2">审核中</span>
        <span v-if="query.state==3">审核成功</span>
        <span v-if="query.state==4">审核失败</span>
      </div>
      <div class="tip" style="display: flex;" v-if="query.state==4">
        <span>失败原因：</span>
        <span style="color: #ee0a24;">{{query.failReason}}</span>
      </div>
      <div class="form-box">
        <van-form class="form" label-width="auto">
          <!-- <MySelect label="注册类型" :option="{label:'name',value:'id'}" placeholder="请选择" v-model="query.regMerType"
            :columns="regMerTypeArr" :errMsg="verification.regMerType"></MySelect> -->
          <van-field required readonly value="小微商户" label="注册类型" :error-message="verification.regMerType" />
          <van-field required :readonly="(query.state==4 ||  !query.merId) ? false :true" v-model="query.legalName"
            label="法人身份证姓名" placeholder="请输入姓名" :error-message="verification.legalName" @blur="VerifyCellLegalName" />
          <van-field required :readonly="(query.state==4 ||  !query.merId) ? false :true" v-model="query.legalIdcardNo	"
            label="法人身份证号码" placeholder="请输入身份证号码" :error-message="verification.legalIdcardNo	"
            @blur="VerifyCelllegaLIdcardNo" />
          <van-field required :readonly="(query.state==4 ||  !query.merId) ? false :true" v-model="query.legalMobile"
            label="法人手机号" placeholder="请输入联系电话" :error-message="verification.legalMobile"
            @blur="VerifyCellLegalMobile" />
          <van-field required :readonly="(query.state==4 ||  !query.merId) ? false :true" v-model="query.legalEmail"
            label="法人邮箱" placeholder="请输入邮箱" :error-message="verification.legalEmail" @blur="VerifyCelllegalEmail" />
          <van-field required :readonly="(query.state==4 ||  !query.merId) ? false :true" v-model="query.shopName"
            label="商户营业名称" placeholder="请输入营业名称" :error-message="verification.shopName" @blur="VerifyCellShopName" />

          <van-field required is-link v-model="query.bankBranchName" label="	开户行支行名称" placeholder="请输入开户行支行名称"
            :error-message="verification.bankBranchName" @change="VerifyCellBankBranchName"
            @click="$router.push('/search')" />

          <van-field required v-model="query.bankAcctName" label="	开户帐号姓名" placeholder="请输入开户帐号姓名"
            :error-message="verification.bankAcctName" @blur="VerifyCellBankAcctName" />
        </van-form>
      </div>
      <div class="form">
        <van-form label-width="auto">
          <van-field required v-model="region" is-link readonly label="所在地区" placeholder="请选择所在地区"
            @click="showPicker = true" :error-message="verification.region" @change="VerifyCellRegion" />
          <van-popup v-model="showPicker" round position="bottom">
            <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="showPicker = false"
              @finish="onFinish" />
          </van-popup>
          <van-field required :readonly="(query.state==4 ||  !query.merId) ? false :true" v-model="query.shopRoad"
            label="营业地址路名" placeholder="请输入营业地址路名" :error-message="verification.shopRoad" @blur="VerifyCellShopRoad" />
          <van-field required :readonly="(query.state==4 ||  !query.merId) ? false :true" v-model="query.shopHouseNo"
            label="营业地址门牌" placeholder="请输入营业地址门牌" :error-message="verification.shopHouseNo"
            @blur="VerifyCellShopHouseNo" />
          <van-field :readonly="(query.state==4 ||  !query.merId) ? false :true" v-model="query.shopAddrExt"
            label="营业地址补充信" placeholder="请输入营业地址补充信" />
          <!-- <MySelect label="营业执照类型" placeholder="请选择" v-model="query.licenseType" :columns="licenseTypeArr"
            :option="{label:'name',value:'id'}" :errMsg="verification.licenseType"></MySelect>
          <MySelect label="账户类型" placeholder="请选择" v-model="query.bankAcctType" :columns="bankAcctTypeArr"
            :option="{label:'name',value:'id'}" :errMsg="verification.bankAcctType"></MySelect> -->
          <van-field required readonly value="小微商户 无营业执照" label="营业执照类型" />
          <van-field required readonly value="个人账户" label="账户类型" />
          <van-field @click="showmccCode=true" required is-link readonly v-model="mccCode" label="行业类型编码"
            placeholder="请选择" :error-message="verification.mccCode" @change="VerifyCellMccCode" />
          <van-popup v-model="showmccCode" position="bottom">
            <van-picker show-toolbar :columns="mccCodeArr" @cancel="showmccCode = false" @confirm="selectMccCode"
              @change="change" />
          </van-popup>

          <MySelect label="法人职业" placeholder="请选择" v-model="query.legalOccupation" :selectValue="query.legalOccupation"
            :columns="legalOccupationArr" :option="{label:'name',value:'id'}" :errMsg="verification.legalOccupation">
          </MySelect>
          <van-field v-if="isShow" v-model="query.legalOccupationDesc" rows="1" autosize label="法人职业详细描述"
            type="textarea" placeholder="请输入法人职业详细描述" />
          <van-field readonly is-link name="calendar" v-model="query.legalCardBegindate" label="法人代表证件开始日期"
            placeholder="请选择" @click="showCalendar1 = true" :error-message="verification.birthday" @change="" />

          <van-popup v-model="showCalendar1" position="bottom">
            <van-datetime-picker v-model="currentDate" type="date" :minDate="minDate" :maxDate="maxDate"
              @confirm="onConfirm1" @cancel="showCalendar1 = false" />
          </van-popup>
          <van-field readonly is-link name="calendar" v-model="query.legalCardDeadline" label="法人代表证件截止日期"
            placeholder="请选择" @click="showCalendar2 = true" :error-message="verification.birthday" @change="" />
          <van-popup v-model="showCalendar2" position="bottom">
            <van-datetime-picker v-model="currentDate" type="date" :minDate="minDate" :maxDate="maxDate"
              @confirm="onConfirm2" @cancel="showCalendar2 = false" />
          </van-popup>
        </van-form>
      </div>
      <div class="form-image">
        <van-form label-width="auto">
          <div class="card">
            <div class="card-title"><span style="color: #ee0a24;">*</span>法人身份证正反面</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadidentityJust">
              <div v-if="!query.merId && !query.identityJust" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>身份证正面</span>
              </div>
              <div v-else-if="!query.identityJust && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.identityJust" :src="query.identityJust" alt="" class="image">

            </van-uploader>

            <span class="err-msg">{{verification.identityJust}}</span>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadidentityBack">
              <div v-if="!query.merId && !query.identityBack" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>身份证反面</span>
              </div>
              <div v-else-if="!query.identityBack && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.identityBack" :src="query.identityBack" alt="" class="image">

            </van-uploader>


            <span class="err-msg">{{verification.identityBack}}</span>
          </div>
          <div class="card">
            <div class="card-title"><span style="color: #ee0a24;">*</span>自拍照（手持身份证）</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadholdIdentity">
              <div v-if="!query.merId && !query.holdIdentity" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>自拍照</span>
              </div>
              <div v-else-if="!query.holdIdentity && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.holdIdentity" :src="query.holdIdentity" alt="" class="image">

            </van-uploader>


            <span class="err-msg">{{verification.holdIdentity}}</span>
          </div>
          <div class="card">
            <div class="card-title"><span style="color: #ee0a24;">*</span>门头照片</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReaddoorPhoto">
              <div v-if="!query.merId && !query.doorPhoto" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>门头照片</span>
              </div>
              <div v-else-if="!query.doorPhoto && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.doorPhoto" :src="query.doorPhoto" alt="" class="image">

            </van-uploader>


            <span class="err-msg">{{verification.doorPhoto}}</span>
          </div>
          <div class="card">
            <div class="card-title"><span style="color: #ee0a24;">*</span>室内照片</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadindoorPhoto">
              <div v-if="!query.merId && !query.indoorPhoto" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>室内照片</span>
              </div>
              <div v-else-if="!query.indoorPhoto && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.indoorPhoto" :src="query.indoorPhoto" alt="" class="image">

            </van-uploader>


            <span class="err-msg">{{verification.indoorPhoto}}</span>
          </div>
          <div class="card">
            <div class="card-title">租赁协议照片</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadleaseAgreement">
              <div v-if="!query.merId && !query.leaseAgreement" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>租赁协议照片</span>
              </div>
              <div v-else-if="!query.leaseAgreement && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.leaseAgreement" :src="query.leaseAgreement" alt="" class="image">

            </van-uploader>


          </div>
          <div class="card">
            <div class="card-title">产权证明照片</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadsecurities">
              <div v-if="!query.merId && !query.securities" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>产权证明照片</span>
              </div>
              <div v-else-if="!query.securities && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.securities" :src="query.securities" alt="" class="image">

            </van-uploader>



          </div>
          <div class="card">
            <div class="card-title">执业资质证照片</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadpraQuaCert">
              <div v-if="!query.merId && !query.praQuaCert" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>执业资质证照片</span>
              </div>
              <div v-else-if="!query.praQuaCert && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.praQuaCert" :src="query.praQuaCert" alt="" class="image">

            </van-uploader>



          </div>
          <div class="card">
            <div class="card-title">第三方证明照片</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadthirdPartyCert">
              <div v-if="!query.merId &&!query.thirdPartyCert " class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>第三方证明照片</span>
              </div>
              <div v-else-if="!query.thirdPartyCert && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.thirdPartyCert" :src="query.thirdPartyCert" alt="" class="image">

            </van-uploader>



          </div>
          <div class="card">
            <div class="card-title">其他小商户证明材料照片</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadotherMaterials">
              <div v-if="!query.merId && !query.otherMaterials" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>其他小商户证明材料照片</span>
              </div>
              <div v-else-if="!query.otherMaterials && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.otherMaterials" :src="query.otherMaterials" alt="" class="image">
            </van-uploader>
          </div>
          <div class="card">
            <div class="card-title"><span style="color: #ee0a24;">*</span>经营商品照片</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadbusinessPhotos">
              <div v-if="!query.merId && !query.businessPhotos" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>经营商品照片</span>
              </div>
              <div v-else-if="!query.businessPhotos && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.businessPhotos" :src="query.businessPhotos" alt="" class="image">

            </van-uploader>


          </div>
          <div class="card">
            <div class="card-title"><span style="color: #ee0a24;">*</span>辅助证明料 1</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadauxiliaryPhoto1">
              <div v-if="!query.merId && !query.auxiliaryPhoto1" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>辅助证明料 1</span>
              </div>
              <div v-else-if="!query.auxiliaryPhoto1 && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.auxiliaryPhoto1" :src="query.auxiliaryPhoto1" alt="" class="image">
            </van-uploader>


          </div>
          <div class="card">
            <div class="card-title">辅助证明料 2</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 || !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadauxiliaryPhoto2">
              <div v-if="!query.merId && !query.auxiliaryPhoto2" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>辅助证明料 2</span>
              </div>
              <div v-else-if="!query.auxiliaryPhoto2 && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.auxiliaryPhoto2" :src="query.auxiliaryPhoto2" alt="" class="image">
            </van-uploader>


          </div>
          <div class="card">
            <div class="card-title">辅助证明料 3</div>
            <div class="advice">建议尺寸500*500，大小不超过2M</div>
            <van-uploader :disabled="(query.state==4 ||  !query.merId) ? false :true" preview-size="160px"
              :after-read="afterReadauxiliaryPhoto3">
              <div v-if="!query.merId && !query.auxiliaryPhoto3" class="image">
                <div class="iconfont icon-jia icon"></div>
                <span>辅助证明料 3</span>
              </div>
              <div v-else-if="!query.auxiliaryPhoto3 && query.state!=4" class="image">
                <span style="font-size: 16px;">暂未上传图片</span>
              </div>
              <img v-else-if="query.auxiliaryPhoto3" :src="query.auxiliaryPhoto3" alt="" class="image">
            </van-uploader>
          </div>
        </van-form>
      </div>

      <van-button v-if="query.state==4" class="btn" round block color="#FC4B4C" @click="updateMerchants">修改信息
      </van-button>
      <van-button v-if="query.state==4" class="btn" round block color="#FC4B4C" @click="submitAgain">再次提交</van-button>
      <van-button v-if="!query.merId" class="btn" round block color="#FC4B4C" @click="submit1">
        确认保存
      </van-button>
      <div style="position: fixed;bottom: 10px;width: 90%;">
        <van-button v-if="query.applyStatus=='00' && query.state==2" class="btn" round block color="#FC4B4C"
          native-type="signUp" @click="signUp">提交签约
        </van-button>
      </div>
    </div>


    <form ref="formData" style="background-color: #f7f7f7;" class="form-horizontal "
      action="https://interface.sh-ums.com/interface/agreementSign">
      <div class="control-group row">
        <label class="control-label col-3" for="merOrderId">merOrderId:</label>
        <div class="controls col-9">
          <input type="text" name="merOrderId" :value="test.merOrderId" />
        </div>
      </div>
      <div class="control-group row">
        <label class="control-label col-3" for="merchantNo">merchantNo:</label>
        <div class="controls col-9">
          <input type="text" name="merchantNo" class="form-control" id="merchantNo" :value="test.merchantNo" />
        </div>
      </div>
      <div class="control-group row">
        <label class="control-label col-3" for="sign">sign:</label>
        <div class="controls col-9">
          <input type="text" name="sign" class="form-control" id="sign" :value="test.sign" />
        </div>
      </div>
      <div class="control-group row">
        <label class="control-label col-3" for="serverCode">serverCode:</label>
        <div class="controls col-9">
          <input type="text" name="serverCode" class="form-control" id="serverCode" :value="test.serverCode" />
        </div>
      </div>
      <div class="control-group row">
        <label class="control-label col-3" for="version">version:</label>
        <div class="controls col-9">
          <input type="text" class="paramsStr form-control" name="version" id="version" :value="test.version" />
        </div>
      </div>
      <div class="control-group row">
        <label class="control-label col-3" for="params">params:</label>
        <div class="controls col-9">
          <textarea class="paramsStr form-control" name="params" id="params">{{params}}</textarea>
        </div>
      </div>
      <div class="control-group row">
        <label class="control-label col-3" for="date">date:</label>
        <div class="controls col-9">
          <input type="text" class="paramsStr form-control" name="date" :value="test.date" />
        </div>
      </div>
      <div class="control-group row">
        <label class="control-label col-3"></label>
        <div class="controls col-9">
          <input type="submit" class="sub_button btn btn-primary" name="button" id="login-button" value="保存">
        </div>
      </div>

    </form>


  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import MySelect from 'components/page/MySelect'
  import { isPhone, isEmail, formatDate, getStore } from "assets/js/utils.js";
  import region from "assets/js/region.js";
  import { wxUpload } from "assets/js/wx.js"
  import { uploadPost } from 'assets/js/http.js'
  import axios from 'axios'
  import qs from 'qs'
  import { Dialog } from 'vant';


  export default {
    name: 'applyNetwork',
    data() {

      return {
        currentDate: new Date(),
        minDate: new Date(1970, 0, 1),
        maxDate: new Date(2099, 11, 31),
        test: {},
        url: '',
        isShow: false,
        showCalendar1: false,
        showCalendar2: false,
        showregMerType: false,
        showPicker: false,//是否显示地区选择器
        showmccCode: false,//是否显示行业编号
        showlicenseType: false,//是否显示营业执照类型选项
        showbankAcctType: false,//是否显示账户类型选项
        showlegalOccupation: false,//是否显示法人职业类型选项
        cascaderValue: '',
        fileList: [],//图片列表
        regMerTypeArr: [{ name: '小微商户', id: '2' },],
        arr: [
          { "value": 1, "text": "综合零售", "children": [{ "value": 5331, "text": "各类杂货店、便利店零售" }, { "value": 5331, "text": "线下小零售" }] },
          { "value": 2, "text": "餐饮业", "children": [{ "value": 5814, "text": "快餐店" }] },
          { "value": 3, "text": "餐饮居民服务", "children": [{ "value": 7295, "text": "家政服务" }, { "value": 7299, "text": "未列入其他代码的个人服务" }, { "value": 7299, "text": "家教" }, { "value": 7299, "text": "美甲美容师" }] },
          { "value": 4, "text": "交通运输、物流和仓储服务", "children": [{ "value": 4121, "text": "出租车服务" }] },
          { "value": 5, "text": "批发商户", "children": [{ "value": 5998, "text": "其他批发商" }] }
        ],
        licenseTypeArr: [{ name: '小微商户 无营业执照', id: "2" }],//营业执照类型
        bankAcctTypeArr: [{ name: '个人账户', id: '0' }],//账户类型
        legalOccupationArr: [
          { name: '各类专业、技术人员', id: '0' },
          { name: '国家机关、党群组织、企事业单位的负责人', id: '1' },
          { name: '办事人员和有关人员', id: '2' },
          { name: '商业工作人员', id: '3' },
          { name: '服务性工作人员', id: '4' },
          { name: '农林牧渔劳动者', id: '5' },
          { name: '生产工作、运输工作和部分体力劳动者', id: '6' },
          { name: '不便分类的其他劳动者', id: '7' },
        ],//法人职业类型

        query: {
          regMerType: "02",//注册类型 默认 02：小微商户
          legalName: "",//法人身份证姓名
          legalIdcardNo: "",//法人身份证号
          legalMobile: "",//法人手机号
          legalEmail: "",//法人邮箱
          shopName: "",//商户营业名称
          bankNo: "",//开户行行号
          bankBranchName: "",//开户行支行名称
          bankAcctNo: "",//开户行帐号
          bankAcctName: "",//开户帐号姓名
          shopProvinceId: "",//营业省份 id
          shopProvinceName: "",//营业省份名称
          shopCityId: "",//营业市 id
          shopCityName: "",//营业市名称
          shopCountryId: "",//营业区 id
          shopCountryName: "",//营业区名称
          shopRoad: "",//营业地址路名
          shopHouseNo: "",//营业地址门牌
          shopAddrExt: "",//营业地址补充信
          licenseType: "2",//营业执照类型 默认 小微商户 2 无营业执照
          bankAcctType: "0",//账户类型 默认 0：个人账户
          mccCode: "",//行业类别编码
          legalOccupation: "",//法人职业 0-各类专业、技术人员 1-国家机关、党群组织、企事业单位的负责人 2-办事人员和有关人员 3-商业工作人员 4-服务性工作人员 5-农林牧渔劳动者 6-生产工作、运输工作和部分体力劳动者 7-不便分类的其他劳动者
          legalOccupationDesc: "",//法人职业详细描 当 legalOccupation 为 7-不便分类的其他劳动者时必填
          legalCardBegindate: "",//法人代表证件开始日期
          legalCardDeadline: "",//法人代表证件截止日期
          identityJust: "",//法人身份证正面
          identityBack: "",//法人身份证反面
          holdIdentity: "",//自拍照（手持身份证）
          doorPhoto: "",//门头照片
          indoorPhoto: "",//室内照片
          leaseAgreement: "",//租赁协议 0016
          securities: "",//产权证明 0017
          praQuaCert: "",//执业资质证照 0018
          thirdPartyCert: "",//第三方证明 0019
          otherMaterials: "",//其他小微商户证明材料 0020（0016-0020 小微商户必传其一）
          businessPhotos: "",//经营商品照片
          auxiliaryPhoto1: "",//辅助证明材料1
          auxiliaryPhoto2: "",//辅助证明材料2
          auxiliaryPhoto3: "",//辅助证明材料3
        },

        verification: {
          regMerType: "",//注册类型 默认 02：小微商户
          legalName: "",//法人身份证姓名
          legalIdcardNo: "",//法人身份证号
          legalMobile: "",//法人手机号
          legalEmail: "",//法人邮箱
          shopName: "",//商户营业名称
          bankNo: "",//开户行行号
          bankBranchName: "",//开户行支行名称
          bankAcctNo: "",//开户行帐号
          bankAcctName: "",//开户帐号姓名
          region: "",
          shopCountryName: "",//营业区名称
          shopRoad: "",//营业地址路名
          shopHouseNo: "",//营业地址门牌
          shopAddrExt: "",//营业地址补充信
          licenseType: "",//营业执照类型 默认 小微商户 2 无营业执照
          bankAcctType: "",//账户类型 默认 0：个人账户
          mccCode: "",//行业类别编码
          legalOccupation: "",//法人职业 0-各类专业、技术人员 1-国家机关、党群组织、企事业单位的负责人 2-办事人员和有关人员 3-商业工作人员 4-服务性工作人员 5-农林牧渔劳动者 6-生产工作、运输工作和部分体力劳动者 7-不便分类的其他劳动者
          legalOccupationDesc: "",//法人职业详细描 当 legalOccupation 为 7-不便分类的其他劳动者时必填
          identityJust: "",//法人身份证正面
          identityBack: "",//法人身份证反面
          holdIdentity: "",//自拍照（手持身份证）
          doorPhoto: "",//门头照片
          indoorPhoto: "",//室内照片
        },//错误提示
        options: this.getOption(),

        config: {},
        region: '',//地区
        mccCode: "",//行业类别编码
        // minDate: new Date(2010, 0, 1),
        show: '',
        mccCodeArr: [],

        identityJust: [],//身份证正面
        identityBack: [],//身份证反面
        holdIdentity: [],//自拍照（手持身份证）
        doorPhoto: [],//门头照片
        indoorPhoto: [],//室内照片
        leaseAgreement: [],//租赁协议 0016
        securities: [],//产权证明 0017
        praQuaCert: [],//执业资质证照 0018
        thirdPartyCert: [],//第三方证明 0019
        otherMaterials: [],//其他小微商户证明材料 0020（0016-0020 小微商户必传其一）
        businessPhotos: [],//经营商品照片
        auxiliaryPhoto1: [],//辅助证明材料1
        auxiliaryPhoto2: [],//辅助证明材料2
        auxiliaryPhoto3: [],//辅助证明材料3
        params: ''
      };
    },



    activated() {
      console.log(this.query)
      if (this.$route.query.bankNo) {
        this.query.bankNo = this.$route.query.bankNo;

      }
      if (this.$route.query.bankBranchName) {
        this.query.bankBranchName = this.$route.query.bankBranchName;

      }
    },
    created() {
      this.showMerchants()
      this.mccCodeArr = [
        { values: this.arr },
        { values: this.arr[0].children }
      ]
    },
    methods: {


      //确认日期
      onConfirm1(date) {
        this.showCalendar1 = false;
        this.query.legalCardBegindate = formatDate(date);
      },
      onConfirm2(date) {
        this.showCalendar2 = false;
        this.query.legalCardDeadline = formatDate(date);
      },
      signUp() {
        let merOrderId = new Date().getTime() + Math.random().toString(36).slice(-6),
          frontUrl = 'http://dragonworld.top/futureBaby/index.html#/applyNetwork',
          paramsData = JSON.stringify({ umsRegId: this.query.umsRegId, frontUrl })
        this.$http('/orderlist/getSign', {
          merOrderId,
          serverCode: 'agreementSign',
          paramsData
        }).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.test = res.data
            console.log(res.data)
            this.params = `{"umsRegId":"${this.test.params.umsRegId}","frontUrl":"${this.test.params.frontUrl}"}`
            console.log(this.$refs.formData)
            this.$nextTick(() => {
              this.$refs.formData.submit()
            })
            // this.$http('/interface/agreementSign', data).then(res => {
            //   this.url = res;
            //   // document.write(this.url);
            //   // document.close();
            //   // this.$router.push({ path: '/sign', query: { url: this.url } })
            // })
          }
        })


      },
      change(picker, values) {
        let index = this.arr.findIndex(item => {
          console.log(item.value)
          return item.value == values[0].value
        })
        this.mccCodeArr = [
          { values: this.arr },
          { values: this.arr[index].children }
        ]
      },
      selectMccCode(value) {
        console.log(value)
        this.mccCode = value[1].text;
        this.query.mccCode = value[1].value;
        this.showmccCode = false;
      },
      showMerchants() {

        this.$http('/orderlist/showMerchants').then(res => {
          if (res.code == 200) {
            if (Object.keys(res.data).length !== 0) {
              this.query = res.data;
              this.region = this.query.shopProvinceName + this.query.shopCityName + this.query.shopCountryName;
              this.mccCode = this.arr.filter(el => {
                return el.children.find(val => {
                  return val.value == this.query.mccCode
                })
              })[0].text;


            } else {
              this.show = 1;
            }

          }
        })
      },
      //全部选项选择完成后触发
      onFinish({ selectedOptions }) {
        this.showPicker = false;
        this.query.shopProvinceName = selectedOptions[0].text;
        this.query.shopCityName = selectedOptions[1].text;
        this.query.shopCountryName = selectedOptions[2].text;
        this.query.shopProvinceId = selectedOptions[0].value;
        this.query.shopCityId = selectedOptions[1].value;
        this.query.shopCountryId = selectedOptions[2].value;
        this.region = selectedOptions[0].text + selectedOptions[1].text + selectedOptions[2].text
      },
      compresseImg(file) {
        return new Promise((resolve, reject) => {
          if (/\/(?:jpeg|png|jpg|bmp)/i.test(file.file.type) && file.file.size > 2 * 1024 * 1024) {
            // 创建Canvas对象(画布)
            let canvas = document.createElement('canvas')
            // 获取对应的CanvasRenderingContext2D对象(画笔)
            let context = canvas.getContext('2d')
            // 创建新的图片对象 
            let img = new Image()
            // 指定图片的DataURL(图片的base64编码数据)
            img.src = file.content
            //画布宽度
            let width = 512
            // 监听浏览器加载图片完成，然后进行绘制
            img.onload = () => {
              //画布大小按照图片的比例生成
              let height = width / (img.naturalWidth / img.naturalHeight)
              // 指定canvas画布大小，该大小为最后生成图片的大小
              canvas.width = width
              canvas.height = height
              /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点， canvas.width, canvas.height 是将图片按给定的像素进行缩小。*/
              /* 如果不指定缩小的像素，图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后得到的图片就是张局部图。图片小于画布就会有黑边。*/
              context.drawImage(img, 0, 0, canvas.width, canvas.height)
              // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
              file.content = canvas.toDataURL(file.file.type, 0.8)
              //将base64编码的图片转成文件(file)格式
              let lastfile = this.dataURLtoFile(file.content, file.file.type, file.file.name);
              //把file转换成二进制形式(binart)并进行上传
              console.log(lastfile, 987)
              if (lastfile.size >= 2 * 1024 * 1024) {
                this.$toast.fail("图片大小不超过2M")
              } else {
                resolve(lastfile);
              }
            }
          } else {
            resolve(file.file)
          }
        })
      },
      dataURLtoFile(dataurl, type, name) {
        var arr = dataurl.split(","),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], name, {
          type: type
        });
      },
      //上传图片
      afterReadidentityJust(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData();
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.identityJust = res.data;
            }
          })
        })
      },


      afterReadidentityBack(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.identityBack = res.data;

            }
          })
        })


      },
      afterReadholdIdentity(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.holdIdentity = res.data;

            }
          })
        })


      },
      afterReaddoorPhoto(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.doorPhoto = res.data;

            }
          })
        })


      },
      afterReadindoorPhoto(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.indoorPhoto = res.data;

            }
          })
        })


      },
      afterReadleaseAgreement(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.leaseAgreement = res.data;

            }
          })
        })


      },
      afterReadsecurities(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.securities = res.data;

            }
          })
        })


      },
      afterReadpraQuaCert(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.praQuaCert = res.data;

            }
          })
        })


      },
      afterReadthirdPartyCert(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.thirdPartyCert = res.data;

            }
          })
        })


      },
      afterReadotherMaterials(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.otherMaterials = res.data;

            }
          })
        })


      },
      afterReadbusinessPhotos(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.businessPhotos = res.data;

            }
          })
        })


      },
      afterReadauxiliaryPhoto1(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.auxiliaryPhoto1 = res.data;

            }
          })
        })


      },
      afterReadauxiliaryPhoto2(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.auxiliaryPhoto2 = res.data;

            }
          })

        })

      },
      afterReadauxiliaryPhoto3(file) {
        this.compresseImg(file).then(file => {
          let formData = new FormData()
          formData.append('myfiles', file)
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.query.auxiliaryPhoto3 = res.data;

            }
          })
        })


      },
      //获取省市区列表
      getOption() {
        let arr = [];
        for (const key1 in region['86']) {
          if (region['86'].hasOwnProperty.call(region['86'], key1)) {
            let a = { value: key1, text: region['86'][key1], children: [] }
            arr.push(a)
            for (const key2 in region[key1]) {
              if (region[key1].hasOwnProperty.call(region[key1], key2)) {
                let b = { value: key2, text: region[key1][key2], children: [] }
                let bChildren = arr.find((item => {
                  return item.value == key1
                })).children
                bChildren.push(b)
                for (const key3 in region[key2]) {
                  if (region[key2].hasOwnProperty.call(region[key2], key3)) {
                    let c = { value: key3, text: region[key2][key3] }
                    bChildren.find((item => {
                      return item.value == key2
                    })).children.push(c)
                  }
                }
              }
            }
          }
        }
        return arr;
      },

      //确认保存
      submit1() {


        if (!this.VerifyCellLegalName()) return false;

        if (!this.VerifyCelllegaLIdcardNo()) return false;
        if (!this.VerifyCellLegalMobile()) return false;
        if (!this.VerifyCelllegalEmail()) return false;
        if (!this.VerifyCellShopName()) return false;

        if (!this.VerifyCellBankBranchName()) return false;

        if (!this.VerifyCellBankAcctName()) return false;
        console.log(8888)
        if (!this.VerifyCellRegion()) return false;

        if (!this.VerifyCellShopRoad()) return false;
        if (!this.VerifyCellShopHouseNo()) return false;

        if (!this.VerifyCellMccCode()) return false;

        if (this.query.identityJust == '') {
          this.verification.identityJust = '请上传身份证正面';
          return false;
        } else {
          this.verification.identityJust = '';
        }
        if (this.query.identityBack == '') {
          this.verification.identityBack = '请上传身份证反面';
          return false;
        } else {
          this.verification.identityBack = '';
        }
        if (this.query.holdIdentity == '') {
          this.verification.holdIdentity = '请上传自拍照';
          return false;
        } else {
          this.verification.holdIdentity = '';
        }
        if (this.query.doorPhoto == '') {
          this.verification.doorPhoto = '请上传门头照片';
          return false;
        } else {
          this.verification.doorPhoto = '';
        }
        if (this.query.indoorPhoto == '') {
          this.verification.indoorPhoto = '请上传室内照片';
          return false;
        } else {
          this.verification.indoorPhoto = '';
        }

        if (this.query.legalName != this.query.shopName) {
          Dialog({ message: '法人身份证姓名与商户营业名称不一致' })

        }

        if (this.query.otherMaterials == '' && this.query.businessPhotos == '' && this.query.auxiliaryPhoto1 == '' && this.query.auxiliaryPhoto2 == '' && this.query.auxiliaryPhoto3 == '') {
          Dialog({ message: '（租赁协议，产权证明，执业资质证照，第三方证明，其他小微商户证明材料）必传其一' })
        }


        this.$http('/orderlist/insertMerchants', this.query).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg)
            this.showMerchants()
          } else if (code == 500) {
            this.$toast.fail(res.msg);
          }
        })
      },

      updateMerchants() {



        if (!this.VerifyCellLegalName()) return false;

        if (!this.VerifyCelllegaLIdcardNo()) return false;
        if (!this.VerifyCellLegalMobile()) return false;
        if (!this.VerifyCelllegalEmail()) return false;
        if (!this.VerifyCellShopName()) return false;

        if (!this.VerifyCellBankBranchName()) return false;

        if (!this.VerifyCellBankAcctName()) return false;

        if (!this.VerifyCellRegion()) return false;

        if (!this.VerifyCellShopRoad()) return false;
        if (!this.VerifyCellShopHouseNo()) return false;

        if (!this.VerifyCellMccCode()) return false;

        if (this.query.identityJust == '') {
          this.verification.identityJust = '请上传身份证正面';
          return false;
        } else {
          this.verification.identityJust = '';
        }
        if (this.query.identityBack == '') {
          this.verification.identityBack = '请上传身份证反面';
          return false;
        } else {
          this.verification.identityBack = '';
        }
        if (this.query.holdIdentity == '') {
          this.verification.holdIdentity = '请上传自拍照';
          return false;
        } else {
          this.verification.holdIdentity = '';
        }
        if (this.query.doorPhoto == '') {
          this.verification.doorPhoto = '请上传门头照片';
          return false;
        } else {
          this.verification.doorPhoto = '';
        }
        if (this.query.indoorPhoto == '') {
          this.verification.indoorPhoto = '请上传室内照片';
          return false;
        } else {
          this.verification.indoorPhoto = '';
        }

        if (this.query.legalName != this.query.shopName) {
          Dialog({ message: '法人身份证姓名与商户营业名称不一致' })

        }

        if (this.query.otherMaterials == '' && this.query.businessPhotos == '' && this.query.auxiliaryPhoto1 == '' && this.query.auxiliaryPhoto2 == '' && this.query.auxiliaryPhoto3 == '') {
          Dialog({ message: '（租赁协议，产权证明，执业资质证照，第三方证明，其他小微商户证明材料）必传其一' })
        }

        this.$http('/orderlist/updateMerchants', this.query).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg)
            this.showMerchants()
          } else if (res.code == 500) {
            this.$toast.fail(res.msg)
          }
        })
      },
      submitAgain() {
        this.$http('/orderlist/submitMerchants', {
          merId: this.query.merId
        }).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg);
            this.showMerchants();
          } else if (code == 500) {
            this.$toast.fail(res.msg);
          }
        })
      },
      // VerifyCellRegMerType() {
      //   if (this.query.regMerType == '') {
      //     this.verification.regMerType = '注册类型不能为空';
      //     console.log(this.verification.regMerType)
      //     return false;
      //   } else {
      //     this.verification.regMerType = "";
      //     return true;
      //   }
      // },
      VerifyCellLegalName() {
        if (this.query.legalName == '') {
          this.verification.legalName = '法人身份证姓名不能为空';
          console.log(this.verification.legalName)

          return false;
        } else {
          this.verification.legalName = "";
          return true;
        }
      },
      VerifyCelllegaLIdcardNo() {
        if (this.query.legalIdcardNo == '') {
          this.verification.legalIdcardNo = '法人身份证号不能为空';
          return false;
        } else {
          this.verification.legalIdcardNo = "";
          return true;
        }
      },
      VerifyCellLegalMobile() {
        if (this.query.legalMobile == '') {
          this.verification.legalMobile = '法人手机号不能为空';
          return false;
        } else if (!isPhone(this.query.legalMobile)) {
          this.verification.legalMobile = '法人手机号不正确';
          return false;
        } else {
          this.verification.legalMobile = '';
          return true;
        }
      },
      VerifyCelllegalEmail() {
        if (this.query.legalEmail == '') {
          this.verification.legalEmail = '法人邮箱不能为空';
          return false;
        } else if (!isEmail(this.query.legalEmail)) {
          this.verification.legalEmail = '法人邮箱不正确';
          return false;
        } else {
          this.verification.legalEmail = '';
          return true;
        }
      },
      VerifyCellShopName() {
        if (this.query.shopName == '') {
          this.verification.shopName = '商户营业名称不能为空';
          return false;
        } else {
          this.verification.shopName = "";
          return true;
        }
      },
      VerifyCellBankNo() {
        if (this.query.bankNo == '') {
          this.verification.bankNo = '开户行行号不能为空';
          return false;
        } else {
          this.verification.bankNo = "";
          return true;
        }
      },
      VerifyCellBankBranchName() {
        if (this.query.bankBranchName == '') {
          this.verification.bankBranchName = '开户行支行名称不能为空';
          return false;
        } else {
          this.verification.bankBranchName = "";
          return true;
        }
      },
      VerifyCellBankAcctNo() {
        if (this.query.bankAcctNo == '') {
          this.verification.bankAcctNo = '开户行账号不能为空';
          return false;
        } else {
          this.verification.bankAcctNo = "";
          return true;
        }
      },
      VerifyCellBankAcctName() {
        if (this.query.bankAcctName == '') {
          this.verification.bankAcctName = '开户行账号姓名不能为空';
          return false;
        } else {
          this.verification.bankAcctName = "";
          return true;
        }
      },
      VerifyCellRegion() {
        if (this.region == '') {
          this.verification.region = '所在地区不能为空';
          return false;
        } else {
          this.verification.region = "";
          return true;
        }
      },
      VerifyCellShopRoad() {
        if (this.query.shopRoad == '') {
          this.verification.shopRoad = '营业地址路名不能为空';
          return false;
        } else {
          this.verification.shopRoad = "";
          return true;
        }
      },
      VerifyCellShopHouseNo() {
        if (this.query.shopHouseNo == '') {
          this.verification.shopHouseNo = '营业地址门牌不能为空';
          return false;
        } else {
          this.verification.shopHouseNo = "";
          return true;
        }
      },
      VerifyCellLicenseType() {
        if (this.query.licenseType == '') {
          this.verification.licenseType = '营业执照类型不能为空';
          return false;
        } else {
          this.verification.licenseType = '';
          return true;
        }
      },
      VerifyCellBankAcctType() {
        if (this.query.bankAcctType == '') {
          this.verification.bankAcctType = '账户类型不能为空';
          return false;
        } else {
          this.verification.bankAcctType = '';
          return true;
        }
      },
      VerifyCellMccCode() {
        if (this.mccCode == '') {
          this.verification.mccCode = '行业类别编码不能为空';
          return false;
        } else {
          this.verification.mccCode = '';
          return true;
        }
      },
      VerifyCellLegalOccupation() {
        if (this.query.legalOccupation == '') {
          this.verification.legalOccupation = '法人职业 不能为空';
          return false;
        } else {
          this.verification.legalOccupation = '';
          return true;
        }
      }
    },
    components: {
      NavBar,
      MySelect,
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .control-group,
  .control-group div,
  .control-group input,
  textarea {
    height: 0;
    opacity: 0;
    font-size: 0;
  }

  .audition {}

  .tip {
    @include sc(.8rem, #333);
    display: flex;

    span:first-child {
      flex-shrink: 0
    }

  }

  .content {
    min-height: calc(100% - 44px);
    background: #f7f7f7;
    padding: 1rem;

    .title {
      @include sc(.8rem, #333);
      padding: 0 .5rem .5rem;

    }

    .err-msg {
      @include sc(.6rem, #ee0a24);
    }

    .cover {
      @include wh(100%, 9.4rem);

      border-radius: 0.5rem;
    }




    .form {
      background: $fc;
      margin-bottom: .5rem;

      box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
      border-radius: 10px;

    }

    .btn {
      margin-top: 1rem;
    }


    .form-image {
      padding: 1rem;
      background-color: $fc;
    }

    .card-title {
      line-height: 30px;
      font-size: 15px;
      color: #333333;
    }

    .advice {
      @include sc(.6rem, #aaa);

    }

    .image {
      width: 8rem;
      height: 8rem;
      background: #EFEFEF;
      border-radius: 5px;
      position: relative;
      margin-top: 10px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon {
        @include sc(2rem, #aaa);

      }

      span {

        @include sc(.6rem, #aaa)
      }
    }




  }
</style>