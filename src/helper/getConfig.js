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

export const getConfigUpdate = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
);