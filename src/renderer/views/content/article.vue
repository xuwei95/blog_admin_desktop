<template>
  <div class="app-container">
    <el-table
      :data="article_list"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="tags"
        label="标签">
      </el-table-column>
      <el-table-column
        prop="is_public"
        label="是否公开">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建日期">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit_article(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delete_article(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="listQuery.limit"
      :current-page="listQuery.page"
      layout="total, prev, pager, next, sizes, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="current_change">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" title="编辑文章" width="100%" top="0">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="left">
          <el-form-item label="文章分类">
            <el-select v-model="form.category" placeholder="选择分类">
              <div v-for="item in category_list" :key="item.id">
                <el-option :label="''+item.name" :value="''+item.name"/>
              </div>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="文章标题">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.tags"/>
        </el-form-item>
        <mavon-editor v-model="form.content" :toolbars="toolbars" :subfield="false"/>
        <div class="left">
          <el-form-item label="是否公开">
            <el-switch
              v-model="form.is_public"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="Update_Article">发布</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { get_article_list } from '@/api/admin_api'
import { get_category_list } from '@/api/admin_api'
import { update_article } from '@/api/admin_api'
import { delete_article } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      article_list: [],
      dialogVisible: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      form: {
        id: '',
        category: '',
        title: '',
        tags: '',
        content: '',
        is_public: 1
      },
      del_form: {
        id: '',
        real_delete: false
      },
      category_list: [],
      listLoading: true,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true // 导航目录
      }
    }
  },
  created() {
    this.fetchData()
    this.get_Category_list()
  },
  methods: {
    handleSizeChange: function(size) {
      this.listQuery.limit = size
      this.fetchData()
    },
    current_change: function(currentPage) {
      this.listQuery.page = currentPage
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      get_article_list(this.listQuery).then(response => {
        this.article_list = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    edit_article(row) {
      this.form.id = row.id
      this.form.category = row.category
      this.form.title = row.title
      this.form.tags = row.tags
      this.form.content = row.content
      this.form.is_public = (row.is_public === '是')
      this.dialogVisible = true
    },
    delete_article(row) {
      this.del_form.id = row.id
      delete_article(this.del_form).then(response => {
        this.fetchData()
        Message.success(response.msg)
      })
    },
    get_Category_list() {
      get_category_list().then(response => {
        this.category_list = response.data
      })
    },
    Update_Article() {
      update_article(this.form).then(response => {
        Message.success(response.msg)
        this.fetchData()
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
  .app-container{
    text-align: center;
  }
  .left{
  text-align: left;
  }
</style>

