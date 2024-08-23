<template>
    <el-dialog :visible.sync="newUserDialogVisible" :before-close="cancelAddNewUser" append-to-body center
        class="p-0 users">
        <span slot="title" class="text-left">
            <h5 class="text-dark">
                <i class="fas fa-user-plus mr-2"></i>Create User
            </h5>
        </span>
        <form accept-charset="UTF-8">
            <div class="container">
                <div class="row">
                    <div class="col-12 pb-0">
                        <label class="mb-0 pb-0 text-dark">First Name<span style="color: #dc3545">*</span>
                        </label>
                        <el-input class="mb-2 pl-1" v-model="setFirstName" placeholder="Enter First Name" rows="1" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 pb-0">
                        <label class="mb-0 pb-0 text-dark">Last Name <span style="color: #dc3545">*</span></label>
                        <el-input v-model="setLastName" class="mb-2 pl-1" placeholder="Enter Last Name" rows="1" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 pb-0">
                        <label class="mb-0 pb-0 text-dark">Email<span style="color: #dc3545">*</span></label>
                        <el-input name="email" v-model="setEmail" placeholder="Enter Email" v-validate="'email'"
                            :class="{ error: errors.has('email') }" rows="1" class="mb-2 pl-1" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 py-1 text-right" style="line-height:6">
                        <button @click.prevent="createUser" v-show="email && lastName && firstName && !createAnotherUserBtn
        " class="btn btn-md bg-primary text-light modalBtns" v-tooltip="`Save`">
                            <i class="fas fa-save"></i>
                        </button>
                        <button type="default" v-tooltip="`Create another user`" @click.prevent="createAnotherUser"
                            v-if="email && lastName && firstName && createAnotherUserBtn
        " class="btn btn-md btn-primary text-light modalBtns">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                        <button @click.prevent="cancelAddNewUser"
                            class="btn btn-md bg-secondary text-light ml-0 modalBtns" v-tooltip="`Cancel`">
                            <i class="fas fa-ban"></i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </el-dialog>
</template>
<script>
export default {
    name: 'AddSettingsUserModal',
    props: ['newUserDialogVisible', 'firstName', 'lastName', 'email', 'createAnotherUserBtn'],
    data() {
        return {
            localNewUserDialogVisible: false,
            setFirstName: this.firstName,
            setLastName: this.lastName,
            setEmail: this.email
        }
    },
    methods: {
        cancelAddNewUser() {
            this.$emit('cancelAddNewUser');
        },
        createAnotherUser() {
            this.$emit('createAnotherUser')
        },
        createUser(){
            this.$emit('createUser')
        }
    },
    watch: {
        newUserDialogVisible(val) {
            this.localNewUserDialogVisible = val;
        },
        setFirstName(val) {
            this.$emit('setFirstName', val)
        },
        setLastName(val) {
            this.$emit('setLastName', val)
        },
        setEmail(val) {
            this.$emit('setEmail', val)
        }
    }
}
</script>