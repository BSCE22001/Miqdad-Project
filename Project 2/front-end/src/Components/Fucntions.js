export const onChangeHandler = (event, data, setData) => {
    const temp = {};
    temp[event.target.name] = event.target.value;

    if (event.target.name === "Gender")
        temp[event.target.name] = event.target.id;

    if (data)
        setData({ ...data, ...temp });
    else
        setData(temp);
}

export const onClickHandler = async (route, method, navigate, data) => {

    const response = await fetch(`/${route}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
            userFirstName: data.FirstName,
            userLastName: data.LastName,
            userAge: data.Age,
            userGender: data.Gender,
            userProfession: data.Profession,
        })
    })

    if (response.status === 200) {
        navigate('/Home');
    }
}

export async function fetchData(navigate, setData, buttonHandlerSignOut, setWait) {

    console.log("Use effect was called");

    if (!localStorage.getItem("userToken")) {
        console.log("did not find a user Token\nnavigating to login");
        navigate("/");
    }

    const response = await fetch('/home', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("userToken")}`
        }
    });

    if (response.status === 401) {
        buttonHandlerSignOut();
    }
    else if (response.status === 403) {
        setData(undefined);
        setWait(false);
    }
    else if (response.status === 200) {
        let responseObject = await JSON.parse(await response.text());
        setData(responseObject);
        setWait(false);
    }
    else {
        console.error(response.text(), "Error");
    }

}

export async function apiCall(navigate, setError, data) {
    if (data['userName'] !== "" && data['userPassword'] !== "" && data['userEmail'] !== "") {

        const response = await fetch("/registration", {
            method: "POST",
            headers: {
                "CONTENT-TYPE": "application/json"
            },
            body: JSON.stringify({
                userName: data['userName'], userPassword: data['userPassword'], userEmail: data['userEmail'],
            })
        });
        console.log(response.status);
        if (response.status === 200) {
            setError(false);
            navigate("/", { state: { email: data['userEmail'] } });
        }
        else {
            setError(true);
        }
    }
}

export const buttonHandlerSignOut = (navigate) => {
    localStorage.removeItem("userToken");
    navigate('/');
  }

export const buttonHandlerUpdate = (navigate) => {
    navigate("/Update");
  }

export const buttonHandlerDelete = async (buttonHandlerSignOut) => {
    const deleteResponse = await fetch('/remove', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("userToken")}`,
      }
    })
    
    if(deleteResponse.status === 200)
    {
      console.log("Account successfully deleted");
      buttonHandlerSignOut();
    }
  }

export async function loginApiCall(setError,setuserEmail,navigate,setuserPassword,data) {
    if (data['userPassword'] !== "" && data['userEmail'] !== "") {

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "CONTENT-TYPE": "application/json"
            },
            body: JSON.stringify({
                userPassword: data['userPassword'], userEmail: data['userEmail'],
            })
        });

        if (response.status === 200) {
            setError(false);
            setuserEmail("");
            let responseObject = await JSON.parse(await response.text());
            const token = responseObject.token;

            localStorage.setItem("userToken", token);
            navigate("/Home");
        }
        else {
            const err = await response.text();
            alert(err);
            setError(true);
        }
        setuserPassword("");
    }
}

