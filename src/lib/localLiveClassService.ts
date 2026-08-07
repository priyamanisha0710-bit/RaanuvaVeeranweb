import { LiveClass } from '../types';

const API_BASE_URL = "https://api.codingboss.in/military";

const mapLiveClass = (item: any): LiveClass => {
  if (!item || typeof item !== 'object') {
    return {
      id: `class-${Date.now()}`,
      title: 'Untitled Class',
      video_url: '',
      scheduled_time: new Date().toISOString(),
      duration_minutes: 30,
      status: 'scheduled',
      created_at: new Date().toISOString()
    };
  }
  let scheduled_time = item.scheduled_time;
  if (!scheduled_time && item.live_date && item.start_time) {
    scheduled_time = `${item.live_date}T${item.start_time}`;
  }
  return {
    ...item,
    id: String(item.id || item.pk || `class-${Date.now()}`),
    video_url: item.video_url || item.stream_url || item.original_video || '',
    scheduled_time: scheduled_time || new Date().toISOString(),
    duration_minutes: item.duration_minutes || item.duration || 30,
    status: item.status || 'scheduled',
    created_at: item.created_at || new Date().toISOString()
  };
};

const handleFetchError = async (response: Response, endpoint: string) => {
  if (!response.ok) {
    const text = await response.text().catch(() => 'Unknown Error');
    console.error(`API Error [${endpoint}]: ${response.status} ${response.statusText}`, text);
    throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
  }
};

export const localLiveClassService = {
  getAll: async (): Promise<LiveClass[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/list/`, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      await handleFetchError(response, 'getAll');
      const data = await response.json();
      const list: any[] = Array.isArray(data) ? data : (data?.results || data?.data || (data && typeof data === 'object' ? Object.values(data) : []) || []);
      const mappedList: LiveClass[] = list.filter(Boolean).map(mapLiveClass);
      return mappedList.sort(
        (a, b) =>
          new Date(a.scheduled_time || 0).getTime() -
          new Date(b.scheduled_time || 0).getTime()
      );
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  getUpcoming: async (): Promise<LiveClass[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/upcoming/`, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      await handleFetchError(response, 'getUpcoming');
      const data = await response.json();
      const list: any[] = Array.isArray(data) ? data : (data?.results || data?.data || []);
      return list.filter(Boolean).map(mapLiveClass);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  getLiveNow: async (): Promise<LiveClass[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/live-now/`, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      await handleFetchError(response, 'getLiveNow');
      const data = await response.json();
      const list: any[] = Array.isArray(data) ? data : (data?.results || data?.data || []);
      return list.filter(Boolean).map(mapLiveClass);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  getEnded: async (): Promise<LiveClass[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/ended/`, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      await handleFetchError(response, 'getEnded');
      const data = await response.json();
      const list: any[] = Array.isArray(data) ? data : (data?.results || data?.data || []);
      return list.filter(Boolean).map(mapLiveClass);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  search: async (query: string): Promise<LiveClass[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/search/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ query, q: query })
      });
      await handleFetchError(response, 'search');
      const data = await response.json();
      const list: any[] = Array.isArray(data) ? data : (data?.results || data?.data || []);
      return list.filter(Boolean).map(mapLiveClass);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  create: async (
    liveClass: Omit<LiveClass, 'id' | 'created_at' | 'video_url'>,
    file?: File | null,
    videoUrl?: string
  ): Promise<LiveClass | null> => {
    try {
      const formData = new FormData();
      formData.append('title', liveClass.title);
      formData.append('description', liveClass.description || '');

      const dateObj = new Date(liveClass.scheduled_time);
      if (!isNaN(dateObj.getTime())) {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const live_date = `${year}-${month}-${day}`;
        const start_time = dateObj.toTimeString().split(' ')[0].slice(0, 5);
        formData.append('live_date', live_date);
        formData.append('start_time', start_time);
      }
      formData.append('duration', String(Math.round(liveClass.duration_minutes || 30)));

      if (file) {
        formData.append('original_video', file);
      }
      if (videoUrl) {
        formData.append('video_url', videoUrl);
      }

      const response = await fetch(`${API_BASE_URL}/live/upload/`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        body: formData,
      });

      await handleFetchError(response, 'create');
      const data = await response.json();
      return mapLiveClass(data);
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  update: async (
    id: string,
    updates: Partial<LiveClass>
  ): Promise<LiveClass | null> => {
    try {
      const payload: any = { ...updates };
      if (updates.scheduled_time) {
        const dateObj = new Date(updates.scheduled_time);
        if (!isNaN(dateObj.getTime())) {
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          payload.live_date = `${year}-${month}-${day}`;
          payload.start_time = dateObj.toTimeString().split(' ')[0].slice(0, 5);
        }
        delete payload.scheduled_time;
      }

      if (updates.duration_minutes !== undefined) {
        payload.duration = Math.round(updates.duration_minutes);
        delete payload.duration_minutes;
      }

      const response = await fetch(`${API_BASE_URL}/live/edit/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload),
      });

      await handleFetchError(response, 'update');
      const data = await response.json();
      return mapLiveClass(data);
    } catch (err: any) {
      console.error(err);
      return null;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      await handleFetchError(response, 'delete');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  getVideoUrl: async (id: string): Promise<string | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/stream/${id}/`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      await handleFetchError(response, 'getVideoUrl');
      const data = await response.json();
      if (data?.stream_url) {
        let url = data.stream_url;
        if (url.startsWith('/')) {
          const origin = new URL(API_BASE_URL).origin;
          url = `${origin}${url}`;
        }
        return url;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  revokeVideoUrl: (): void => {
  },

  viewerJoin: async (classId: string, userEmail: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/viewer/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ live_video: classId, user_id: 1, session_id: userEmail }),
      });
      await handleFetchError(response, 'viewerJoin');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  viewerLeave: async (classId: string, userEmail: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/viewer/leave/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ live_video: classId, session_id: userEmail }),
      });
      await handleFetchError(response, 'viewerLeave');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  viewerHeartbeat: async (classId: string, userEmail: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/viewer/heartbeat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ live_video: classId, session_id: userEmail }),
      });
      await handleFetchError(response, 'viewerHeartbeat');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  getWatchTime: async (classId: string, userEmail: string): Promise<number> => {
    try {
      const response = await fetch(`${API_BASE_URL}/viewer/watch-time/?live_video=${classId}&session_id=${userEmail}`, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      await handleFetchError(response, 'getWatchTime');
      const data = await response.json();
      return data?.watch_time_minutes || 0;
    } catch (err) {
      console.error(err);
      return 0;
    }
  },

  start: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/start/${id}/`, {
        method: 'POST',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      await handleFetchError(response, 'start');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  forceStart: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/start/${id}/`, {
        method: 'POST',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      await handleFetchError(response, 'forceStart');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  forceEnd: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/end/${id}/`, {
        method: 'POST',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      await handleFetchError(response, 'forceEnd');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  changeStatus: async (id: string, status: LiveClass['status'] | string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live/change-status/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ status }),
      });
      await handleFetchError(response, 'changeStatus');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  getDashboardStats: async (): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/`, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      await handleFetchError(response, 'getDashboardStats');
      return await response.json();
    } catch (err) {
      console.error(err);
      return {
        total_classes: 0,
        total_viewers: 0,
        live_now: 0
      };
    }
  },

  getViewerList: async (classId?: string): Promise<any[]> => {
    try {
      const url = classId ? `${API_BASE_URL}/viewer/list/?class_id=${classId}` : `${API_BASE_URL}/viewer/list/`;
      const response = await fetch(url, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      await handleFetchError(response, 'getViewerList');
      const data = await response.json();
      return Array.isArray(data) ? data : (data?.results || data?.data || []);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  kickViewer: async (viewerId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/viewer/delete/${viewerId}/`, {
        method: 'DELETE',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      await handleFetchError(response, 'kickViewer');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
};
