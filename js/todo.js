let index = 0;
const addBtn = document.getElementById("addBtn")
const todo_form = document.getElementById("todo_form")

const steps = ['1', '2']
const Queue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: 'Next >',
    // optional classes to avoid backdrop blinking between steps
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' }
})
async function FireQueue() {
    if (localStorage.getItem('name') === null && localStorage.getItem('focus') === null) {
        let name = null;
        let focus = null;
        await Queue.fire({
            title: "what's your name?",
            input: 'text',
            currentProgressStep: 0,
            // optional class to show fade-in backdrop animation which was disabled in Queue mixin
            showClass: { backdrop: 'swal2-noanimation' },
        }).then((result) => {
            if (result.value) {
                name = result.value;
            }
        })
        await Queue.fire({
            title: 'What is your main focus for today?',
            input: 'text',
            currentProgressStep: 1
        }).then((result) => {
            if (result.value) {
                focus = result.value;
                Swal.fire({
                    title: 'All done!',
                    html: `
                    <p>Your Name: ${name}</p>
                    <p>Your Focus: ${focus}</p>
                `,
                    confirmButtonText: 'Lovely!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem('name', name);
                        localStorage.setItem('focus', focus);
                        location.reload();
                    }
                })
            }
        })
    }
}

function deleteTodo(event) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success ms-4',
            cancelButton: 'btn btn-danger me-4'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const li = event.target.parentElement;
            const li_content = li.innerText.substr(0, li.innerText.length - 1)
            li.remove();
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(localStorage.key(i)) === li_content) {
                    localStorage.removeItem(localStorage.key(i))
                    break
                }
            }
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your plan has been deleted.',
                'success'
            )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your todo is safe :)',
                'error'
            )
        }
    })
    /**/
}



async function addTodo(e) {
    let tempTodo = null;
    swal.fire({
        title: "Write your plan",
        input: 'text',

        // optional class to show fade-in backdrop animation which was disabled in Queue mixin
        showClass: { backdrop: 'swal2-noanimation' },
    }).then((result) => {
        if (result.value) {
            tempTodo = result.value;
            const li = document.createElement('li')
            const span = document.createElement('span')
            span.innerText = tempTodo
            const button = document.createElement('button')
            button.setAttribute('type', 'button')
            button.setAttribute('class', 'btn btn-outline-light ms-2 mb-3')
            button.innerText = "❌"
            button.addEventListener("click", deleteTodo)
            span.setAttribute('id', 'focus')
            li.appendChild(span)
            li.appendChild(button)
            todo_form.appendChild(li)
            if (result.isConfirmed) {
                localStorage.setItem(`todo${index}`, tempTodo)
                index++;
            }
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

addBtn.addEventListener("click", addTodo)

FireQueue();