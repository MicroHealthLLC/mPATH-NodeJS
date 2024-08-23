<template>
    <el-dialog :visible.sync="localDialogVisible" :before-close="cancelAddUser" append-to-body center class="p-0 users">
        <span slot="title" class="text-left">
            <h5 class="text-dark">
                <i class="fas fa-users-medical mr-2"></i>Add User(s) To Program
            </h5>
        </span>
        <div class="container">
            <div class="row">
                <div class="col-12" v-if="portfolioUsersOnly">
                    <label class="font-md mb-0">Select from
                        <span class="badge badge-secondary badge-pill pill">
                            {{ portfolioUsersOnly.length }}
                        </span>
                        Portfolio Users
                    </label>
                    <el-select v-model="setPortfolioUsers" class="w-100" track-by="id" value-key="id" :multiple="true"
                        clearable placeholder="Enter name" filterable>
                        <el-option v-for="item in portfolioUsersOnly" :value="item" :key="item.id"
                            :label="item.name || item.full_name">
                        </el-option>
                    </el-select>
                    <div class="text-right">
                        <button type="default" v-tooltip="`Save Users`" @click.prevent="addPortfolioUsersToProgram"
                            v-if="portfolioUsers.length > 0 && !addMoreUsersBtn"
                            class="btn btn-md btn-primary text-light mt-3 modalBtns">
                            <i class="fal fa-save"></i>
                        </button>
                        <button type="default" v-tooltip="`Add more users`" @click.prevent="addMoreUsers"
                            v-if="portfolioUsers && addMoreUsersBtn"
                            class="btn btn-md btn-primary text-light mt-3 modalBtns">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                        <button @click.prevent="cancelAddUser"
                            class="btn btn-md bg-secondary text-light mt-3 ml-0 modalBtns" v-tooltip="`Cancel`">
                            <i class="fas fa-ban"></i>
                        </button>
                    </div>
                </div>

                <div class="col-12" v-else>
                    No Portfolio Users Found
                    <div class="text-right">
                        <button @click.prevent="cancelAddUser"
                            class="btn btn-md bg-secondary text-light mt-3 ml-0 modalBtns" v-tooltip="`Cancel`">
                            <i class="fas fa-ban"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'AddExistingUserodal',
    props: ['dialogVisible', 'portfolioUsersOnly', 'portfolioUsers', 'addMoreUsersBtn'],
    data() {
        return {
            localDialogVisible: false,
            setPortfolioUsers: this.portfolioUsers
        }
    },
    methods: {
        cancelAddUser() {
            this.$emit('cancelAddUser')
        },
        addPortfolioUsersToProgram(){
            this.$emit('addPortfolioUsersToProgram')
        }
    },
    watch: {
        dialogVisible(val) {
            this.localDialogVisible = val
        },
        setPortfolioUsers: {
            handler: function (newVal) {
                this.$emit('setPortfolioUsers', newVal)
            },
            deep: true
        }
    }
}
</script>