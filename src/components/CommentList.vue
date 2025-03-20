<template>
  <div class="card">
    <div class="flex justify-content-between align-items-center mb-4">
      <h2 class="m-0">Comments Management</h2>
      <span class="p-badge p-badge-info">{{ comments.length }} Comments</span>
    </div>

    <div v-if="loading" class="flex justify-content-center align-items-center" style="min-height: 200px;">
      <i class="pi pi-spin pi-spinner text-4xl"></i>
    </div>

    <div v-else-if="error" class="flex justify-content-center align-items-center" style="min-height: 200px;">
      <div class="text-red-500 text-center">
        <i class="pi pi-exclamation-triangle text-4xl mb-2"></i>
        <p>{{ error }}</p>
      </div>
    </div>

    <CommentTable 
      v-else
      :comments="comments"
      @edit="editComment"
    />

    <Dialog 
      v-model:visible="showEditDialog" 
      modal 
      :style="{ width: '50vw' }" 
      :draggable="false"
      :closable="true"
      :modal="true"
      class="p-dialog-lg"
    >
      <template #header>
        <div class="flex align-items-center">
          <i class="pi pi-pencil mr-2"></i>
          <span>Edit Comment</span>
        </div>
      </template>

      <EditCommentForm
        v-if="showEditDialog"
        :commentId="selectedCommentId"
        @cancel="closeEditDialog"
        @save="handleSave"
      />
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import EditCommentForm from './EditCommentForm.vue'
import CommentTable from './CommentTable.vue'

const store = useStore()
const showEditDialog = ref(false)
const selectedCommentId = ref(null)

const comments = computed(() => store.getters['comments/getComments'])
const loading = computed(() => store.getters['comments/isLoading'])
const error = computed(() => store.getters['comments/getError'])

const fetchComments = () => {
  store.dispatch('comments/fetchComments')
}

const editComment = (comment) => {
  store.dispatch('comments/setSelectedComment', comment)
  selectedCommentId.value = comment.id
  showEditDialog.value = true
}

const closeEditDialog = () => {
  showEditDialog.value = false
  selectedCommentId.value = null
  store.dispatch('comments/setSelectedComment', null)
}

const handleSave = async (updatedComment) => {
  const success = await store.dispatch('comments/updateComment', updatedComment)
  if (success) {
    closeEditDialog()
  }
}

onMounted(() => {
  fetchComments()
})
</script>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.p-datatable) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.p-datatable .p-datatable-header) {
  background: var(--surface-section);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: var(--surface-section);
  color: var(--text-color);
  font-weight: 600;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  transition: background-color 0.2s;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: var(--surface-hover);
}

:deep(.p-dialog) {
  border-radius: 10px;
  overflow: hidden;
}

:deep(.p-dialog .p-dialog-header) {
  background: var(--surface-section);
  padding: 1.5rem;
}

:deep(.p-dialog .p-dialog-content) {
  padding: 1.5rem;
}

:deep(.p-dialog .p-dialog-footer) {
  padding: 1rem 1.5rem;
  background: var(--surface-section);
}
</style> 