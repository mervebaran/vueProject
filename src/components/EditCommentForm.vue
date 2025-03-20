<template>
  <div class="edit-form">
    <TabView class="edit-form-tabs">
      <TabPanel header="Basic Information">
        <div class="form-section">
          <div class="field">
            <label for="name" class="block text-900 font-medium mb-2">Name</label>
            <span class="p-input-icon-left w-full">
              <i class="pi pi-user" />
              <InputText 
                id="name" 
                v-model="formData.name" 
                class="w-full" 
                :class="{'p-invalid': v$.name.$error}"
              />
            </span>
            <small class="p-error" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</small>
          </div>

          <div class="field">
            <label for="email" class="block text-900 font-medium mb-2">Email</label>
            <span class="p-input-icon-left w-full">
              <i class="pi pi-envelope" />
              <InputText 
                id="email" 
                v-model="formData.email" 
                class="w-full"
                :class="{'p-invalid': v$.email.$error}"
              />
            </span>
            <small class="p-error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</small>
          </div>
        </div>
      </TabPanel>

      <TabPanel header="Additional Details">
        <div class="form-section">
          <div class="field">
            <label for="comment" class="block text-900 font-medium mb-2">Comment</label>
            <span class="p-input-icon-left w-full">
              <i class="pi pi-comment" />
              <Textarea 
                id="comment" 
                v-model="formData.body" 
                rows="5" 
                class="w-full"
                :class="{'p-invalid': v$.body.$error}"
                autoResize
              />
            </span>
            <small class="p-error" v-if="v$.body.$error">{{ v$.body.$errors[0].$message }}</small>
          </div>
        </div>
      </TabPanel>
    </TabView>

    <div class="flex justify-content-end gap-2 mt-4 pt-4 border-top-1 surface-border">
      <Button 
        label="Cancel" 
        severity="secondary" 
        icon="pi pi-times" 
        @click="cancel" 
      />
      <Button 
        label="Save" 
        severity="success" 
        icon="pi pi-check" 
        :loading="saving"
        @click="save" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

const store = useStore()
const saving = ref(false)

const props = defineProps({
  commentId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['cancel', 'save'])

const formData = ref({
  postId: 1,
  id: props.commentId,
  name: '',
  email: '',
  body: ''
})

const rules = {
  name: { required, minLength: minLength(3) },
  email: { required, email },
  body: { required, minLength: minLength(10) }
}

const v$ = useVuelidate(rules, formData)

const selectedComment = computed(() => store.getters['comments/getSelectedComment'])

const initializeForm = () => {
  if (selectedComment.value) {
    formData.value = { ...selectedComment.value }
  }
}

const save = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  saving.value = true
  try {
    emit('save', formData.value)
  } finally {
    saving.value = false
  }
}

const cancel = () => {
  emit('cancel')
}

onMounted(() => {
  initializeForm()
})
</script>

<style scoped>
.edit-form {
  padding: 0.5rem;
}

.edit-form-tabs {
  margin-bottom: 1rem;
}

.form-section {
  padding: 1rem 0;
}

.field {
  margin-bottom: 1.5rem;
}

.field:last-child {
  margin-bottom: 0;
}

:deep(.p-tabview-nav) {
  background: var(--surface-section);
  border-radius: 8px 8px 0 0;
  padding: 0.5rem 0.5rem 0;
}

:deep(.p-tabview-panels) {
  background: var(--surface-card);
  border-radius: 0 0 8px 8px;
  padding: 1.5rem;
}

:deep(.p-inputtext) {
  width: 100%;
}

:deep(.p-input-icon-left > i) {
  color: var(--text-color-secondary);
}

:deep(.p-button) {
  min-width: 100px;
}

:deep(.p-button .p-button-icon) {
  margin-right: 0.5rem;
}
</style> 