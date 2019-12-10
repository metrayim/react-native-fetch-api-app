import { actionType } from '../action/actionType';
import axios from "axios";
export const fetchArticle = () => {

  return dispatch => {
    axios
      .get("http://api-ams.me/v1/api/articles?page=1&limit=15")
      .then(result => {
        dispatch({
          type: actionType.FETCH_ARTICLE,
          payLoad: result.data.DATA
        });
      })
      .catch(error => console.log("eroror fetch", error));
  }
};

export const uploadImage = (responseData) => {
  console.log("hiii", responseData)
  const { title, description, response } = responseData;
  var file = new FormData()
  file.append('FILE', {
    name: response.fileName,
    type: response.type,
    uri: response.uri
  })
  return dispatch => {
    axios({
      method: 'POST',
      url: 'http://api-ams.me/v1/api/uploadfile/single',
      data: file
    }).then((res) => {
      axios({
        method: "POST",
        url: "http://api-ams.me/v1/api/articles",
        data: { TITLE: title, DESCRIPTION: description, IMAGE: res.data.DATA }
      }).then((respon) => {
        axios.get("http://api-ams.me/v1/api/articles?page=1&limit=15")
          .then(result => {
            dispatch({
              type: actionType.FETCH_ARTICLE,
              payLoad: result.data.DATA
            })
          })

      })
    }).catch((res) => {
      console.log('metra error', res)
    })

  }
}
export const deleteArticle = (id) => {
  return dispatch => {
    axios({
      method: "DELETE",
      url: "http://api-ams.me/v1/api/articles/" + id,
    })
      .then(res => {
        axios.get("http://api-ams.me/v1/api/articles?page=1&limit=15")
          .then(result => {
            dispatch({
              type: actionType.FETCH_ARTICLE,
              payLoad: result.data.DATA
            })
          })
      })
      .catch((res) => {
        console.log('metra error', res)
      })
  }
}

export const getArticleById = (id) => {
  console.log(id, 'hi metra id')
  return dispatch => {
    axios.get("http://api-ams.me/v1/api/articles/" + id)
      .then(result => {
        console.log('haha', result.data.DATA)
        dispatch({
          type: actionType.VEIW_ARTICLE,
          payLoad: result.data.DATA
          //  type:actionType.VEIW_ARTICLE,
          //  payLoad:res.data.DATA
        });
      })
      .catch((result) => { console.log('metra error', result) })
  }

}
export const searchArticle = (title) => {
  return dispatch => {
    axios
      .get("http://api-ams.me/v1/api/articles?title=" + title + "&page=1&limit=15")
      .then(result => {
        console.log("result", result);
        dispatch({
          type: actionType.SEARCH_ARTICLE,
          payLoad: result.data.DATA,
          isLoading: true
        });
      })
      .catch(error => console.log("eroror fetch", error));
  }
}
