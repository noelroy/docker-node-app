(function ($) {
    'use strict';
    $(function () {

        populateList();

        var todoListItem = $('.todo-list');
        var todoListInput = $('.todo-list-input');
        $('.todo-list-add-btn').on("click", addItem);

        todoListItem.on('change', '.checkbox', updateItem);

        todoListItem.on('click', '.remove', removeItem);

        async function populateList() {

            const response = await fetch('http://localhost:3000/items')
            const jsonResponse = await response.json();

            for (let i = 0; i < jsonResponse.length; ++i) {
                // create an item for each one
                let listItem = $('<li/>').html(`
                <div class="form-check"> <label class="form-check-label"> <input class="checkbox" type="checkbox" ${jsonResponse[i].done ? 'checked=""' : ''}> ${jsonResponse[i].text} <i class="input-helper"></i></label> </div> <i class="remove mdi mdi-close-circle-outline"></i>
            `);
                listItem.attr("data-id", jsonResponse[i]._id)

                if (jsonResponse[i].done) listItem.addClass('completed');

                // Add listItem to the listElement
                todoListItem.append(listItem);
            }
        }

        async function addItem(event) {
            event.preventDefault();

            var item = $(this).prevAll('.todo-list-input').val();

            const payload = {
                text: item,
                done: false
            };

            if (item) {
                const response = await fetch('http://localhost:3000/items', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)

                })
                const jsonResponse = await response.json();

                todoListItem.append(`<li data-id='${jsonResponse.insertedId}'>
                    <div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox' /> ${item} <i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i>
                    </li>`);
                todoListInput.val("");

            }

        }

        async function removeItem(event) {
            const id = $(this).parent().attr("data-id");
            const response = await fetch('http://localhost:3000/items/' + id, {
                method: 'DELETE'
            })
            $(this).parent().remove();
        }

        async function updateItem(event) {
            let payload = {};
            if ($(this).attr('checked')) {
                $(this).removeAttr('checked');
                payload["done"] = false;
            } else {
                $(this).attr('checked', 'checked');
                payload["done"] = true;
            }

            const id = $(this).closest("li").attr("data-id");

            const response = await fetch('http://localhost:3000/items/'+id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)

            })

            $(this).closest("li").toggleClass('completed');
        }

    });
})(jQuery);