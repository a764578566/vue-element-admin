<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddMember">新增会员</el-button>
    <el-table :data="members">
      <el-table-column fixed prop="index" align="center" label="序列号" width="60">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column v-if="false" fixed prop="id" align="center" label="主键">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column fixed prop="memberCode" label="会员编码" width="120">
        <template slot-scope="scope">
          {{ scope.row.memberCode }}
        </template>
      </el-table-column>
      <el-table-column prop="memberName" label="会员名称" width="120">
        <template slot-scope="scope">
          {{ scope.row.memberName }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template></el-table-column>
      <el-table-column prop="birthday" label="生日" width="120">
        <template slot-scope="scope">
          {{ dateForment(scope.row.birthday) }}
        </template></el-table-column>
      <el-table-column prop="sex" label="性别" width="60">
        <template slot-scope="scope">
          {{ scope.row.sex == 1 ? "女" : "男" }}
        </template></el-table-column>
      <el-table-column prop="remark" label="备注" width="300">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑会员':'新增会员'">
      <el-form :model="member" label-width="80px" label-position="left">
        <el-form-item label="会员编码">
          <el-input v-model="member.memberCode" disabled placeholder="会员编码" />
        </el-form-item>
        <el-form-item label="会员名称">
          <el-input v-model="member.memberName" placeholder="会员名称" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="member.phone" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="member.birthday" type="date" format="yyyy-MM-dd" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select ref="性别" v-model="member.sex">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="member.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="备注"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getMembers, getMemberCode, addMember, deleteMember, updateMember } from '@/api/member'
import moment from 'moment'

const defaultMember = {
  memberCode: '',
  memberName: '周建荣',
  phone: '15710037611',
  sex: 1,
  birthday: '1992-10-18',
  remark: '备注'
}

export default {
  data() {
    return {
      member: Object.assign({}, defaultMember),
      members: [],
      options: [
        { value: 1, label: '女' },
        { value: 2, label: '男' }
      ],
      dialogVisible: false,
      dialogType: 'new'
    }
  },
  created() {
    this.getMembers()
  },
  methods: {
    async getMembers() {
      const res = await getMembers()
      this.members = res.data
    },
    async handleAddMember() {
      this.member = Object.assign({}, defaultMember)
      await this.getMemberCode()
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    async getMemberCode() {
      const { data } = await getMemberCode()
      this.member.memberCode = data
    },
    dateForment(column) {
      var date = column
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },
    handleEdit(row) {
      this.member = deepClone(row)
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除这个会员吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteMember(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getMembers()
        })
        .catch(err => { console.error(err) })
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateMember(this.member.id, this.member)
        this.getMembers()
      } else {
        const { data } = await addMember(this.member)
        this.member.id = data.id
        this.members.push(this.member)
      }

      const { remark, phone, memberName } = this.member
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>会员名称: ${memberName}</div>
            <div>手机号码: ${phone}</div>
            <div>备注: ${remark}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>
