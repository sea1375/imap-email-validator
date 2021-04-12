$(function () {
    console.log('file loading');

    var email_list = [];
    var imap_servers;
    var data_loaded = false;

    function loadEmails() {
        $.get('mails.txt', function (res) {
            if (!res) return;

            var lines = res.split('\n');
            lines.forEach(line => {
                var infos = line.split(":");
                if (infos.length == 2) {
                    email_list.push({
                        username: $.trim(infos[0]),
                        password: $.trim(infos[1]),
                        status: "none"
                    });
                }
            });

            loadServers();
        }, 'text');
    }

    function loadServers() {
        $.get('imap_server.json', function (data) {
            imap_servers = data;

            console.log(imap_servers);
            console.log(email_list);
            data_loaded = true;
            showData();
        }, 'JSON');
    }

    function showData() {
        for (var i = 0; i < email_list.length; i++) {
            var email = email_list[i];
            $('#all-emails').append(`
                <div class="item" id="email_${i}">
                    <div class="row">
                        <div class="col-md-5">
                            <label>${email.username}</label>
                        </div>
                        <div class="col-md-5">
                            <label>${email.password}</label>
                        </div>
                        <div class="col-md-2" class="status">
                            <label class="status"></label>
                        </div>
                    </div>
                </div>
            `);
        }
    }

    function addValidEmail(index) {
        email_list[index].status = 'valid';
        $('#email_' + index + ' .status').html('<label class="text-success">Valid</label>');
        // $('#valid-emails').append(`
        //     <div class="item">
        //         <div class="row">
        //             <div class="col-md-6">
        //                 <label>${email}</label>
        //             </div>
        //             <div class="col-md-6">
        //                 <label class="text-success">Valid</label>
        //             </div>
        //         </div>
        //     </div>
        // `);
    }

    function addInvalidEmail(index) {
        email_list[index].status = 'invalid';
        $('#email_' + index + ' .status').html('<label class="text-danger">Invalid</label>');
        // $('#valid-emails').append(`
        //     <div class="item">
        //         <div class="row">
        //             <div class="col-md-6">
        //                 <label>${email}</label>
        //             </div>
        //             <div class="col-md-6">
        //                 <label class="text-danger">Invalid</label>
        //             </div>
        //         </div>
        //     </div>
        // `);
    }

    function clearValidEmails() {
        $('#valid-emails').html(`
            <div class="item">
                <div class="row">
                    <div class="col-md-6">
                        <label class="fw-bold">Email</label>
                    </div>
                    <div class="col-md-6">
                        <label class="fw-bold">Status</label>
                    </div>
                </div>
            </div>
        `)
    }

    function clearSearchEmails() {
        $('#valid-emails').html(`
            <div class="item">
                <div class="row">
                    <div class="col-md-6">
                        <label class="fw-bold">Email</label>
                    </div>
                    <div class="col-md-6">
                        <label class="fw-bold">Status</label>
                    </div>
                </div>
            </div>
        `)
    }

    $('#btn_validate').click(() => {
        if (!data_loaded) {
            'You need to wait Email Data loaded';
            return;
        }

        if (email_list.length) {
            // clearValidEmails();
            $('#all-emails .status').html('');
            for (var i = 0; i < email_list.length; i++) {
                email_list[i].status = 'none';
            }
            validateEmail(0);
        }
    });

    function validateEmail(index) {
        email = email_list[index];
        var imap_server;
        for (var key in imap_servers) {
            if (email.username.indexOf(key) > -1) {
                imap_server = imap_servers[key];
                continue;
            }
        }

        if (!imap_server) {
            console.log("there isn't IMAP server for " + email.username);
            addInvalidEmail(index);
            validateNext(index);
        } else {
            $.ajax({
                method: 'post',
                url: 'api.php',
                data: {
                    imap_server: imap_server,
                    username: email.username,
                    password: email.password
                },
                success: function (data, textStatus) {
                    try {
                        var res = JSON.parse(data);
                        if (res.success) {

                            addValidEmail(index);
                        } else {
                            addInvalidEmail(index);
                        }

                        validateNext(index)
                    } catch (e) {
                        addInvalidEmail(index);
                        validateNext(index)
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    addInvalidEmail(index);

                    validateNext(index)
                }
            })
        }


    }

    function validateNext(index) {
        index++;
        if (index == email_list.length) {
            alert('validation finished');
            return;
        }
        validateEmail(index);
    }

    $('#btn_search').click(() => {
        var searchkey = $('#searchkey').val();
        if (!searchkey) {
            'You need to input search key';
            return;
        }

        var searchedEmails = email_list.filter(email => {
            return (email.username.indexOf(searchkey) > -1) && email.status != 'none';
        })

        searchedEmails.forEach(email => {
            $('#valid-emails').append(`
                <div class="item">
                    <div class="row">
                        <div class="col-md-6">
                            <label>${email.username}</label>
                        </div>
                        <div class="col-md-6">
                            <label class="text-${email.status == 'valid' ? 'success' : 'danger'}">${email.status == 'valid' ? 'Valid' : 'Invalid'}</label>
                        </div>
                    </div>
                </div>
            `);
        })
    });



    loadEmails();









    console.log('load');
});