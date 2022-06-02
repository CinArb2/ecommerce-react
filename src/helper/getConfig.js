export const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
}
);

export const getConfigFormData = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'multipart/form-data'
    }
  }
);

export const getConfigSignUp = () => ({
  headers: {
    'Content-Type': 'multipart/form-data'
    }
  }
);