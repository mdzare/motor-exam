export async function PostData(url, data) {
    return fetch('http://localhost:3000/' + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}
export async function PutData(url, id, data) {
    return fetch('http://localhost:3000/' + url + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}
export async function GetData(url) {
    return fetch('http://localhost:3000/' + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok)
                return response.json()
            return {};
        })
        .catch(error => console.error(error));
}

export async function DeleteData(url, id) {
    return fetch('http://localhost:3000/' + url + '/' + id, {
        method: 'DELETE',
    })
        .catch(error => console.error(error));
}