<template>
    <el-dialog append-to-body :visible.sync="localDialogVisible" :before-close="cancelCreateGroup" center
        class="contractForm p-0 addProjectDialog">
        <span slot="title" class="text-left add-groups-header ">
            <h5 class="text-dark"> <i class="far fa-plus-circle mr-1 mb-3"></i>Create Project </h5>
        </span>
        <form accept-charset="UTF-8">
            <div class="form-group mx-4">
                <label class="font-md">Project Name <span style="color: #dc3545">*</span></label>
                <el-input v-model="localProjectName" placeholder="Enter New Project Name" rows="1"
                    name="Project Name" />
            </div>
            <div class="form-group mx-4">
                <label class="font-md">Group</label>
                <el-select class="w-100" v-model="C_projectGroupFilter" track-by="id" value-key="id" clearable
                    filterable name="Project Group" placeholder="Search and select Group">
                    <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="d-flex justify-content-end mr-4">
                <button size="small" @click.prevent="saveNewProject" v-show="localProjectName"
                    v-tooltip="`Save Project`" :class="[hideSaveBtn ? 'd-none' : '']"
                    class="btn btn-md bg-primary text-light modalBtns mr-1"> <i class="far fa-save"></i></button>
                <button size="small" @click.prevent="addAnotherProject" :class="[!hideSaveBtn ? 'd-none' : '']"
                    v-tooltip="`Add Another Project`" class="btn btn-md bg-primary text-light modalBtns mr-1">
                    <i class="far fa-plus-circle"></i>
                </button>
                <button size="small" @click.prevent="cancelCreateGroup"
                    class="btn btn-md bg-secondary text-light modalBtns" v-tooltip="`Cancel`">
                    <i class="fas fa-ban"></i>
                </button>
            </div>
        </form>
    </el-dialog>
</template>

<script>
export default {
    name: 'SettingsProjectModal',
    props: ["dialogVisible", "newProjectNameText", "groupList", "C_projectGroupFilter", "hideSaveBtn"],
    data() {
        return {
            localProjectName: this.newProjectNameText,
            localDialogVisible: this.dialogVisible
        };
    },
    methods: {
        saveNewProject() {
            this.$emit('saveNewProject', this.localProjectName)
        },
        cancelCreateGroup() {
            this.localProjectName = ""
            this.$emit('cancelCreateGroup')
        }
    },
    watch: {
        dialogVisible(newVal) {
            this.localDialogVisible = newVal;
        },
        localProjectName(newVal) {
            this.$emit('setProjectNameText', newVal)
        }
    }
}
</script>
<style>
.modalBtns {
    box-shadow: 0 2.5px 5px rgba(56, 56, 56, 0.19), 0 3px 3px rgba(56, 56, 56, 0.23);
}
</style>