<template>
  <div>
    <el-popover
      placement="bottom"
      width="800"
      trigger="click">
      <div>
        <el-row style="margin-bottom: 15px" :gutter="20">
          <el-col :span="3"> <el-input v-model="secondRadio" disabled ></el-input></el-col>
          <el-col :span="3"> <el-input v-model="minuteRadio" disabled></el-input></el-col>
          <el-col :span="3"> <el-input v-model="hourRadio" disabled></el-input></el-col>
          <el-col :span="3"> <el-input v-model="dayRadio" disabled></el-input></el-col>
          <el-col :span="3"> <el-input v-model="monthRadio" disabled></el-input></el-col>
          <el-col :span="3"> <el-input v-model="weekRadio" disabled></el-input></el-col>
          <el-col :span="3"> <el-input v-model="yearRadio" disabled></el-input></el-col>
        </el-row>
        <el-tabs type="border-card">
          <el-tab-pane label="秒">
            <el-radio-group v-model="secondRadio">
              <div class="radio_cell">
                <el-radio :label="'*'">*每秒</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="second.startSecond + '/' + second.seconds">
                  {{second.startSecond + "/" + second.seconds}}从第
                  <el-input-number v-model="second.startSecond"  :min="0" :max="59"  label="描述文字"></el-input-number>秒开始
                  每
                  <el-input-number v-model="second.seconds"  :min="1" :max="59" label="描述文字"></el-input-number> 秒</el-radio>
              </div>

              <div class="radio_cell">
                <el-radio :label="second.startSecond2 + '-' + second.endSecond">
                  {{second.startSecond2 + "-" + second.endSecond}}在
                  <el-input-number v-model="second.startSecond2"  :min="1" :max="59" label="描述文字"></el-input-number> 秒
                  到
                  <el-input-number v-model="second.endSecond"  :min="second.startSecond2" :max="59" label="描述文字"></el-input-number> 秒之间的每秒</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="second.fixedSecond.join(',')">
                  {{second.fixedSecond.join(",")}}固定的(可多选)
                  <el-select v-model="second.fixedSecond" multiple  placeholder="请选择"
                             @change="handleChangeSecond"
                             @remove-tag="handleRemoveSecondTag">
                    <el-option
                      v-for="item in getConsecutiveNumbers(0,59)"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  秒</el-radio>
              </div>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="分">
            <el-radio-group v-model="minuteRadio">
              <div class="radio_cell">
                <el-radio :label="'*'">*每分</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="minute.startMinute + '/' + minute.minutes">
                  {{minute.startMinute + "/" + minute.minutes}}从第
                  <el-input-number v-model="minute.startMinute"  :min="0" :max="59"  label="描述文字"></el-input-number>分开始
                  每
                  <el-input-number v-model="minute.minutes"  :min="1" :max="59" label="描述文字"></el-input-number> 分</el-radio>
              </div>

              <div class="radio_cell">
                <el-radio :label="minute.startMinute2 + '-' + minute.endMinute">
                  {{minute.startMinute2 + "-" + minute.endMinute}}在
                  <el-input-number v-model="minute.startMinute2"  :min="1" :max="minute.endMinute" label="描述文字"></el-input-number> 分
                  到
                  <el-input-number v-model="minute.endMinute"  :min="minute.startMinute2" :max="59" label="描述文字"></el-input-number> 分之间的每分</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="minute.fixedMinute.join(',')">
                  {{minute.fixedMinute.join(",")}}固定的(可多选)
                  <el-select v-model="minute.fixedMinute" multiple  placeholder="请选择"
                             @change="handleChangeMinute"
                             @remove-tag="handleRemoveMinuteTag">
                    <el-option
                      v-for="item in getConsecutiveNumbers(0,59)"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  分</el-radio>
              </div>

            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="时">
            <el-radio-group v-model="hourRadio">
              <div class="radio_cell">
                <el-radio :label="'*'">*每时</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="hour.startHour + '/' + hour.hours">
                  {{hour.startHour + "/" + hour.hours}}从第
                  <el-input-number v-model="hour.startHour"  :min="0" :max="23"  label="描述文字"></el-input-number>时开始
                  每
                  <el-input-number v-model="hour.hours"  :min="0" :max="23" label="描述文字"></el-input-number> 时</el-radio>
              </div>

              <div class="radio_cell">
                <el-radio :label="hour.startHour2 + '-' + hour.endHour">
                  {{hour.startHour2 + "-" + hour.endHour}}在
                  <el-input-number v-model="hour.startHour2"  :min="0" :max="hour.endHour" label="描述文字"></el-input-number> 时
                  到
                  <el-input-number v-model="hour.endHour"  :min="hour.startHour2" :max="23" label="描述文字"></el-input-number> 时之间的每时</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="hour.fixedHour.join(',')">
                  {{hour.fixedHour.join(",")}}固定的(可多选)
                  <el-select v-model="hour.fixedHour" multiple  placeholder="请选择"
                             @change="handleChangeHour"
                             @remove-tag="handleRemoveHourTag">
                    <el-option
                      v-for="item in getConsecutiveNumbers(0,23)"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  时</el-radio>
              </div>

            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="日">
            <el-radio-group v-model="dayRadio">
              <div class="radio_cell">
                <el-radio :label="'*'">*每日</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="day.startDay + '/' + day.days">
                  {{day.startDay + "/" + day.days}}从第
                  <el-input-number v-model="day.startDay"  :min="0" :max="59"  label="描述文字"></el-input-number>日开始
                  每
                  <el-input-number v-model="day.days"  :min="1" :max="31" label="描述文字"></el-input-number> 日</el-radio>
              </div>

              <div class="radio_cell">
                <el-radio :label="day.startDay2 + '-' + day.endDay">
                  {{day.startDay2 + "-" + day.endDay}}在
                  <el-input-number v-model="day.startDay2"  :min="1" :max="day.endDay" label="描述文字"></el-input-number> 日
                  到
                  <el-input-number v-model="day.endDay"  :min="day.startDay2" :max="31" label="描述文字"></el-input-number>
                  日之间的每日</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="day.fixedDay.join(',')">
                  {{day.fixedDay.join(",")}}固定的(可多选)
                  <el-select v-model="day.fixedDay" multiple  placeholder="请选择"
                             @change="handleChangeDay"
                             @remove-tag="handleRemoveDayTag">
                    <el-option
                      v-for="item in getConsecutiveNumbers(1,31)"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  日</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="'?'">
                  ?不固定
                </el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="'LW'">
                  LW本月最后一个工作日
                </el-radio>
              </div>

              <div class="radio_cell">
                <el-radio :label="day.nearDay+'W'">
                  {{day.nearDay+'W'}}每月
                  <el-input-number v-model="day.nearDay"  :min="1" :max="31" label="描述文字"></el-input-number>
                  日最近的工作日
                </el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="'L'+(day.lastDay-1 == 0?'':'-'+(day.lastDay-1))">
                  {{'L'+(day.lastDay-1 == 0?'':'-'+(day.lastDay-1))}}
                  本月倒数第
                  <el-input-number v-model="day.lastDay"  :min="1" :max="31" label="描述文字"></el-input-number>日
                </el-radio>
              </div>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="月">
            <el-radio-group v-model="monthRadio">
              <div class="radio_cell">
                <el-radio :label="'*'">*每月</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="month.startMonth + '/' + month.months">
                  {{month.startMonth + "/" + month.months}}从第
                  <el-input-number v-model="month.startMonth"  :min="1" :max="12"  label="描述文字"></el-input-number>月开始
                  每
                  <el-input-number v-model="month.months"  :min="1" :max="12" label="描述文字"></el-input-number>月</el-radio>
              </div>

              <div class="radio_cell">
                <el-radio :label="month.startMonth2 + '-' + month.endMonth">
                  {{month.startMonth2 + "-" + month.endMonth}}在
                  <el-input-number v-model="month.startMonth2"  :min="1" :max="month.endMonth" label="描述文字"></el-input-number> 月
                  到
                  <el-input-number v-model="month.endMonth"  :min="month.startMonth2" :max="12" label="描述文字"></el-input-number> 月之间的每月</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="month.fixedMonth.join(',')">
                  {{month.fixedMonth.join(",")}}固定的(可多选)
                  <el-select v-model="month.fixedMonth" multiple  placeholder="请选择"
                             @change="handleChangeMonth"
                             @remove-tag="handleRemoveMonthTag">
                    <el-option
                      v-for="item in getConsecutiveNumbers(1,12)"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-radio>
              </div>

            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="周">
            <el-radio-group v-model="weekRadio">
              <div class="radio_cell">
                <el-radio :label="'*'">*每天</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="week.startWeek + '/' + week.weeks">
                  {{week.startWeek + "/" + week.weeks}}从
                  <el-select v-model="week.startWeek"   placeholder="请选择" @change="handleChangeWeekSpe(week.startWeek + '/' + week.weeks)">
                    <el-option
                      v-for="item in week.allWeek"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  开始每
                  <el-input-number v-model="week.weeks"  :min="1" :max="7" label="描述文字"></el-input-number>日</el-radio>
              </div>

              <div class="radio_cell">
                <el-radio :label="week.startWeek2 + '-' + week.endWeek">
                  {{week.startWeek2 + "-" + week.endWeek}}在
                  <el-select v-model="week.startWeek2"   placeholder="请选择"  @change="handleChangeWeekSpe(week.startWeek2 + '-' + week.endWeek)">
                    <el-option
                      v-for="item in week.allWeek"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  到
                  <el-select v-model="week.endWeek"   placeholder="请选择" @change="handleChangeWeekSpe(week.startWeek2 + '-' + week.endWeek)">
                    <el-option
                      v-for="item in week.allWeek"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  之间的每日</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="week.fixedWeek.join(',')">
                  {{week.fixedWeek.join(",")}}固定的(可多选)
                  <el-select v-model="week.fixedWeek" multiple  placeholder="请选择"
                             @change="handleChangeWeek"
                             @remove-tag="handleRemoveWeekTag">
                    <el-option
                      v-for="item in week.allWeek"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="'?'">
                  ?不固定
                </el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="week.numWeek+'#'+week.num">
                  {{week.numWeek+'#'+week.num}}本月第
                  <el-input-number v-model="week.num"  :min="1" :max="5" label="描述文字"></el-input-number>
                  个
                  <el-select v-model="week.numWeek"   placeholder="请选择" @change="handleChangeWeekSpe(week.numWeek+'#'+week.num)">
                    <el-option
                      v-for="item in week.allWeek"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-radio>
              </div>
            </el-radio-group>

          </el-tab-pane>
          <el-tab-pane label="年">
            <el-radio-group v-model="yearRadio">
              <div class="radio_cell">
                <el-radio :label="'*'">*每年</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="year.startYear + '/' + year.years">
                  {{year.startYear + "/" + year.years}}从
                  <el-input-number v-model="year.startYear"  :min="2020" :max="2099" label="描述文字"></el-input-number>
                  开始每
                  <el-input-number v-model="year.years"  :min="1" :max="100" label="描述文字"></el-input-number>年</el-radio>
              </div>

              <div class="radio_cell">
                <el-radio :label="year.startYear2 + '-' + year.endYear">
                  {{year.startYear2 + "-" + year.endYear}}在
                  <el-input-number v-model="year.startYear2"  :min="2020" :max="year.endYear" label="描述文字"></el-input-number>
                  到
                  <el-input-number v-model="year.endYear"  :min="year.startYear2" :max="2099" label="描述文字"></el-input-number>
                  之间的每年</el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="year.fixedYear.join(',')">
                  {{year.fixedYear.join(",")}}固定的(可多选)
                  <el-select v-model="year.fixedYear" multiple  placeholder="请选择"
                             @change="handleChangeYear"
                             @remove-tag="handleRemoveYearTag">
                    <el-option
                      v-for="item in getConsecutiveNumbers(2020,2099)"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-radio>
              </div>
              <div class="radio_cell">
                <el-radio :label="' '">
                  不固定
                </el-radio>
              </div>
            </el-radio-group>
          </el-tab-pane>
<!--          <el-tab-pane label="自定义">-->
<!--            <el-row  :gutter="20">-->
<!--              <el-col :span="3"> <el-input v-model="secondRadio" ></el-input></el-col>-->
<!--              <el-col :span="3"> <el-input v-model="minuteRadio" ></el-input></el-col>-->
<!--              <el-col :span="3"> <el-input v-model="hourRadio" ></el-input></el-col>-->
<!--              <el-col :span="3"> <el-input v-model="dayRadio" ></el-input></el-col>-->
<!--              <el-col :span="3"> <el-input v-model="monthRadio" ></el-input></el-col>-->
<!--              <el-col :span="3"> <el-input v-model="weekRadio"></el-input></el-col>-->
<!--              <el-col :span="3"> <el-input v-model="yearRadio"></el-input></el-col>-->
<!--            </el-row>-->
<!--          </el-tab-pane>-->
        </el-tabs>
      </div>
      <el-input slot="reference" v-model="cronCom"  ></el-input>

    </el-popover>
  </div>
</template>

<script>
  export default {
    name: "CronInput",
    props: ['cron'],
    data() {
      return {
        //秒
        secondRadio:'*',
        second:{
          startSecond:0,
          seconds:1,
          startSecond2:0,
          endSecond:1,
          fixedSecond:[0]
        },
        //分钟
        minuteRadio:'*',
        minute:{
          startMinute:0,
          minutes:1,
          startMinute2:0,
          endMinute:1,
          fixedMinute:[0]
        },
        //小时
        hourRadio:'*',
        hour:{
          startHour:0,
          hours:1,
          startHour2:0,
          endHour:1,
          fixedHour:[0]
        },
        //天
        dayRadio:'*',
        day:{
          startDay:0,
          days:1,
          startDay2:0,
          endDay:1,
          fixedDay:[1],
          nearDay:1,
          lastDay:1
        },
        //月
        monthRadio:'*',
        month:{
          startMonth:0,
          months:1,
          startMonth2:0,
          endMonth:1,
          fixedMonth:[1]
        },
        //星期
        weekRadio:'?',
        week:{
          startWeek:1,
          weeks:1,
          startWeek2:1,
          endWeek:1,
          fixedWeek:[1],
          num:1,
          numWeek:1,
          //TODO 稍后判断startWeek和endWeek
          allWeek:[
            {value:1,label:'星期日'},
            {value:2,label:'星期一'},
            {value:3,label:'星期二'},
            {value:4,label:'星期三'},
            {value:5,label:'星期四'},
            {value:6,label:'星期五'},
            {value:7,label:'星期六'}
          ]
        },
        //年
        yearRadio:'*',
        year:{
          startYear:2020,
          years:1,
          startYear2:2020,
          endYear:2020,
          fixedYear:[2020]
        }
      };
    },
    computed:{
      cronCom:{
        get:function () {
          return this.secondRadio + ' ' + this.minuteRadio + ' ' +this.hourRadio+' '+this.dayRadio
            +' ' +this.monthRadio+' '+this.weekRadio+' '+this.yearRadio
        },
        set:function (newValue) {
          console.log(newValue)
        }
      },
      getConsecutiveNumbers(){
        return function(start,end){
          return Array.from(new Array(end-start + 1).keys()).map(x=>x+start);
        }
      }
    },
    watch: {
      cronCom: {
        handler(curVal, oldVal) {
          console.log(oldVal)
          this.$emit("change", curVal.trim())
        },
        deep: true,
        immediate: true
      },
      cron: {
        //设置正确回显
        handler(curVal, oldVal) {
          console.log(oldVal)
          var arr = curVal.split(" ")
          //秒
          this.secondRadio = arr[0]
          if (this.secondRadio.indexOf("/") != -1) {
            this.second.startSecond = this.secondRadio.split("/")[0]
            this.second.seconds = this.secondRadio.split("/")[1]
          }
          if (this.secondRadio.indexOf("-") != -1) {
            this.second.startSecond2 = parseInt(this.secondRadio.split("-")[0])
            this.second.endSecond = this.secondRadio.split("-")[1]
          }
          if (this.secondRadio.indexOf(",") != -1) {
            this.second.fixedSecond = this.secondRadio.split(",")
          }
          if ((this.secondRadio.indexOf("/") == -1) &&
            (this.secondRadio.indexOf("-") == -1) &&
            (this.secondRadio.indexOf(",") == -1) && (this.secondRadio != "*")) {
            this.second.fixedSecond = this.secondRadio.split(",")
          }
          //分钟
          this.minuteRadio = arr[1]
          if (this.minuteRadio.indexOf("/") != -1) {
            this.minute.startMinute = this.minuteRadio.split("/")[0]
            this.minute.minutes = this.minuteRadio.split("/")[1]
          }
          if (this.minuteRadio.indexOf("-") != -1) {
            this.minute.startMinute2 = parseInt(this.minuteRadio.split("-")[0])
            this.minute.endMinute = parseInt(this.minuteRadio.split("-")[1])
          }
          if (this.minuteRadio.indexOf(",") != -1) {
            this.minute.fixedMinute = this.minuteRadio.split(",")
          }
          if ((this.minuteRadio.indexOf("/") == -1) &&
            (this.minuteRadio.indexOf("-") == -1) &&
            (this.minuteRadio.indexOf(",") == -1) && (this.minuteRadio != "*")) {
            this.minute.fixedMinute = this.minuteRadio.split(",")
          }
          //小时
          this.hourRadio = arr[2]
          if (this.hourRadio.indexOf("/") != -1) {
            this.hour.startHour = this.hourRadio.split("/")[0]
            this.hour.hours = this.hourRadio.split("/")[1]
          }
          if (this.hourRadio.indexOf("-") != -1) {
            this.hour.startHour2 = parseInt(this.hourRadio.split("-")[0])
            this.hour.endHour = parseInt(this.hourRadio.split("-")[1])
          }
          if (this.hourRadio.indexOf(",") != -1) {
            this.hour.fixedHour = this.hourRadio.split(",")
          }
          if ((this.hourRadio.indexOf("/") == -1) &&
            (this.hourRadio.indexOf("-") == -1) &&
            (this.hourRadio.indexOf(",") == -1) && (this.hourRadio != "*")) {
            this.hour.fixedHour = this.hourRadio.split(",")
          }
          //日
          this.dayRadio = arr[3]
          if (this.dayRadio.indexOf("/") != -1) {
            this.day.startDay = this.dayRadio.split("/")[0]
            this.day.days = this.dayRadio.split("/")[1]
          }
          if (this.dayRadio.indexOf("-") != -1 && this.dayRadio.indexOf("L") == -1) {
            this.day.startDay2 = parseInt(this.dayRadio.split("-")[0])
            this.day.endDay = parseInt(this.dayRadio.split("-")[1])
          }
          if (this.dayRadio.indexOf(",") != -1) {
            this.day.fixedDay = this.dayRadio.split(",")
          }
          if (this.dayRadio.indexOf("W") != -1 && this.dayRadio.indexOf("L") == -1) {
            this.day.nearDay = this.dayRadio.replace("W", "")
          }
          if (this.dayRadio.indexOf("-") != -1 && this.dayRadio.indexOf("L") != -1) {
            let dayRadioArr = this.dayRadio.split("-")
            let lastDayVal = dayRadioArr.length > 1 ? this.dayRadio.split("-")[1] : "0"
            this.day.lastDay = parseInt(lastDayVal) + 1
          }
          if ((this.dayRadio.indexOf("/") == -1) &&
            (this.dayRadio.indexOf("-") == -1) &&
            (this.dayRadio.indexOf(",") == -1) &&
            (this.dayRadio.indexOf("W") == -1) &&
            (this.dayRadio.indexOf("L") == -1) &&
            (this.dayRadio.indexOf("?") == -1) &&
            (this.dayRadio != "*")) {
            this.day.fixedDay = this.dayRadio.split(",")
          }
          //月
          this.monthRadio = arr[4]
          if (this.monthRadio.indexOf("/") != -1) {
            this.month.startMonth = this.monthRadio.split("/")[0]
            this.month.months = this.monthRadio.split("/")[1]
          }
          if (this.monthRadio.indexOf("-") != -1) {
            this.month.startMonth2 = parseInt(this.monthRadio.split("-")[0])
            this.month.endMonth = parseInt(this.monthRadio.split("-")[1])
          }
          if (this.monthRadio.indexOf(",") != -1) {
            this.month.fixedMonth = this.monthRadio.split(",")
          }
          if ((this.monthRadio.indexOf("/") == -1) &&
            (this.monthRadio.indexOf("-") == -1) &&
            (this.monthRadio.indexOf(",") == -1) && (this.monthRadio != "*")) {
            this.month.fixedMonth = this.monthRadio.split(",")
          }
          //周
          this.weekRadio = arr[5]
          if (this.weekRadio.indexOf("/") != -1) {
            this.week.startWeek = parseInt(this.weekRadio.split("/")[0])
            this.week.weeks = this.weekRadio.split("/")[1]
          }
          if (this.weekRadio.indexOf("-") != -1) {
            this.week.startWeek2 = parseInt(this.weekRadio.split("-")[0])
            this.week.endWeek = parseInt(this.weekRadio.split("-")[1])
          }
          if (this.weekRadio.indexOf(",") != -1) {
            this.week.fixedWeek = this.weekRadio.split(",")
            this.week.fixedWeek = this.week.fixedWeek.map(x => parseInt(x))
          }
          if (this.weekRadio.indexOf("#") != -1) {
            this.week.numWeek = parseInt(this.weekRadio.split("#")[0])
            this.week.num = this.weekRadio.split("#")[1]
          }
          if ((this.weekRadio.indexOf("/") == -1) &&
            (this.weekRadio.indexOf("-") == -1) &&
            (this.weekRadio.indexOf(",") == -1) &&
            (this.weekRadio.indexOf("#") == -1) &&
            (this.weekRadio.indexOf("?") == -1) &&
            (this.weekRadio != "*")) {
            this.week.fixedWeek = this.weekRadio.split(",")
            this.week.fixedWeek = this.week.fixedWeek.map(x => parseInt(x))
          }

          //年
          this.yearRadio = arr[6] ? arr[6] : ' '
          if (this.yearRadio.indexOf("/") != -1) {
            this.year.startYear = this.yearRadio.split("/")[0]
            this.year.years = this.yearRadio.split("/")[1]
          }
          if (this.yearRadio.indexOf("-") != -1) {
            this.year.startYear2 = parseInt(this.yearRadio.split("-")[0])
            this.year.endYear = parseInt(this.yearRadio.split("-")[1])
          }
          if (this.yearRadio.indexOf(",") != -1) {
            this.year.fixedYear = this.yearRadio.split(",")
          }
          if ((this.yearRadio.indexOf("/") == -1) &&
            (this.yearRadio.indexOf("-") == -1) &&
            (this.yearRadio.indexOf(",") == -1) &&
            (this.yearRadio.indexOf(" ") == -1) &&
            (this.yearRadio != "*")) {
            this.year.fixedYear = this.yearRadio.split(",")
          }
        }
      }
    },
    methods:{
      handleChangeSecond(value){
        this.secondRadio =value.join(",")
      },
      handleChangeMinute(value){
        this.minuteRadio =value.join(",")
      },
      handleChangeHour(value){
        this.hourRadio =value.join(",")
      },
      handleChangeDay(value){
        this.dayRadio =value.join(",")
      },
      handleChangeMonth(value){
        this.monthRadio =value.join(",")
      },
      handleChangeWeek(value){
        this.weekRadio =value.join(",")
      },
      handleChangeYear(value){
        this.yearRadio =value.join(",")
      },
      //处理select选择时radio失去焦点问题
      handleChangeWeekSpe(weekRadioValue){
        this.weekRadio =weekRadioValue;
      },
      handleRemoveSecondTag(tag){
        if(this.second.fixedSecond.length == 0){
          this.msgError("格式不正确")
          this.second.fixedSecond= [tag]
        }
      },
      handleRemoveMinuteTag(tag){
        if(this.minute.fixedMinute.length == 0){
          this.msgError("格式不正确")
          this.minute.fixedMinute= [tag]
        }
      },
      handleRemoveHourTag(tag){
        if(this.hour.fixedHour.length == 0){
          this.msgError("格式不正确")
          this.hour.fixedHour= [tag]
        }
      },
      handleRemoveDayTag(tag){
        if(this.day.fixedDay.length == 0){
          this.msgError("格式不正确")
          this.day.fixedDay = [tag]
        }
      },
      handleRemoveMonthTag(tag){
        if(this.month.fixedMonth.length == 0){
          this.msgError("格式不正确")
          this.month.fixedMonth = [tag]
        }
      },
      handleRemoveWeekTag(tag){
        if(this.week.fixedWeek.length == 0){
          this.msgError("格式不正确")
          this.week.fixedWeek = [tag]
        }
      },
      handleRemoveYearTag(tag){
        if(this.year.fixedYear.length == 0){
          this.msgError("格式不正确")
          this.year.fixedYear = [tag]
        }
      }
    }
  }
</script>

<style scoped>
  .radio_cell{
    margin-bottom: 10px;
  }
</style>
