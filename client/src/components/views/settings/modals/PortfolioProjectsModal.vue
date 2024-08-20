<!-- Any issues with this component might arise during testing. We'll make corrections if necessary. Might be issues with checkedPortfolioProjects -->
<template>
    <el-dialog :visible.sync="localDialogVisible" :before-close="closeImportProjectBtn" append-to-body center
        class="portfolioNames p-0">
        <div>
            <template>
                <div class="sticky">
                    <div class="row mb-2">
                        <div slot="title" class="col-8 pr-0 text-left">
                            <h5 class="text-dark addGroupsHeader"> <i
                                    class="fas fa-clipboard-list mr-2 mh-green-text"></i>Select Portfolio Project(s) to
                                Add </h5>
                        </div>
                        <div class="col-7 pt-0 text-left">
                            <el-input type="search" placeholder="Search Projects" aria-label="Search" class="w-100"
                                aria-describedby="search-addon" v-model="localSearchProjects" data-cy="">
                                <el-button slot="prepend" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                        <div class="col text-right">
                            <el-button class="confirm-save-group-names btn text-light bg-primary modalBtns"
                                v-tooltip="`Save Project(s)`" @click.prevent="importProjectName"
                                :disabled="!programProjects || programProjects.length <= 0">
                                <i class="far fa-save"></i>
                            </el-button>
                            <el-button @click.prevent="closeImportProjectBtn" v-tooltip="`Cancel`"
                                class="btn bg-secondary ml-0 text-light modalBtns">
                                <i class="fas fa-ban"></i>
                            </el-button>
                        </div>
                    </div>
                </div>
            </template>
            <el-checkbox v-model="checkAllProjects" @change="checkAllChange" :indeterminate="isIndeterminate"><i>Check
                    all
                    Projects</i></el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedPortfolioProjects">
                <div class="row">
                    <div class="col-4" v-if="programProjects">
                        <el-checkbox v-for="project in programProjects.filter(g => g.is_portfolio)" :label="project.id"
                            class="d-flex" :key="project.id">{{ project.facility_name }}</el-checkbox>
                    </div>
                </div>
            </el-checkbox-group>
        </div>
    </el-dialog>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    name: 'PortfolioProjectsModal',
    props: ["checkedPortfolioProjects", "dialog2Visible", "searchProjects", "programProjects", "isIndeterminate"],
    data() {
        return {
            localSearchProjects: this.searchProjects,
            localDialogVisible: this.dialog2Visible
        };
    },
    methods: {
        ...mapMutations([
            "SET_CHECK_ALL_PROJECTS",
            "SET_CHECKED_PORTFOLIO_PROJECTS"
        ]),
        importProjectName() {
            this.$emit('importProjectName')
        },
        closeImportProjectBtn() {
            this.localSearchProjects = ''
            this.$emit('closeImportProjectBtn')
        },
        checkAllChange() {
            this.$emit('checkAllChange')
        }
    },
    computed: {
        ...mapGetters(["getCheckAllProjects", "portfolioProjects"]),
        checkAllProjects: {
            get() {
                return this.getCheckAllProjects;
            },
            set(value) {
                // console.log(value);
                this.SET_CHECK_ALL_PROJECTS(value);
                if (value == true) {
                    let checkP = this.portfolioProjects.map((p) => p.id);
                    this.SET_CHECKED_PORTFOLIO_PROJECTS(checkP);
                } else if (value == false) {
                    this.SET_CHECKED_PORTFOLIO_PROJECTS([0]);
                }
            },
        },
    },
    watch: {
        localSearchProjects(newVal) {
            this.$emit('setSearchProject', newVal)
        },
        dialog2Visible(newVal) {
            this.localDialogVisible = newVal
        }
    }
}
</script>
