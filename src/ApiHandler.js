import { API } from "./App";

export const changeStatusAndUpdate = (updatePet, setError, id, status) => {
  const encodedStatusKey = encodeURIComponent("status");
  const encodedStatusValue = encodeURIComponent(status);
  const formBody = encodedStatusKey + "=" + encodedStatusValue;
  fetch(`https://${API}/pet/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: formBody,
  })
    .catch((err) => {
      setError(err);
    })
    .then((res) => {
      if (res.ok) {
        updatePet(id, status);
      }
      console.log(res);
    })
    .catch((err) => {
      setError(err);
    });
};

export const FetchData = (status, setData, setError, setCategories) => {
  fetch(`https://${API}/pet/findByStatus?status=${status}`, { method: "GET" })
    .catch((err) => {
      setError(err);
    })
    .then((res) => {
      res.json().then((res) => {
        setData(res);
        //get categories
        let cats = ["All"];
        res.forEach((pet) => {
          if (pet.category) {
            if (!cats.includes(pet.category.name)) {
              cats.push(pet.category.name);
            }
          }
        });
        setCategories(cats);
      });
    });
};
