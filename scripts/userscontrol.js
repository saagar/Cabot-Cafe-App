$(document).ready(function(){
	$('#userDiag').dialog({ autoOpen: false, 
							modal: true,
							width: 500,
							title: 'Create User',
							buttons: {
								'Submit': function() {
										var paramsArray = { 
											 "id" : $("#userform").attr("name"),
											 "username" : $('#username').val(),
											 "password" : $('#password').val(),
											 "password2" : $('#password2').val(),
											 "firstname" : $('#firstname').val(),
											 "lastname" : $('#lastname').val(), 
											 "email" : $('#email').val(),
											 "phone" : $('#phone').val(),
											 "year" : $('#year').val(),
											 "pin" : $('#pin').val(),
											 "sudo" : $('#sudo').is(':checked') ? $('#sudo').val() : '',
											 "emergency" : $('#emergency').is(':checked') ? $('#emergency').val() : '',
											 "sendto" : $('#sendto').is(':checked') ? $('#sendto').val() : '',
										};
										
										$.ajax({
											type: "POST",
											url: "../admin/handlers.php",
											data:"func=2&params="+JSON.stringify(paramsArray),
											dataType: 'json',
											success: function(data){
												if(data.status == 'success'){
													$(this).dialog('close');
													location.reload();
												}
												if(data.status == 'update_success'){
													alert(data.msg);
													location.reload();
												}
												if(data.status == 'error'){
													alert(data.msg);
												}
											},
											error: function(data){
												alert("Problem loading form!");
											}
										});	
								},
								'Cancel': function() {
									$(this).dialog('close');
								}
							}
	});
	
	$(".updateUserButton").on("click",openUserDiag);
	$('.deleteUserButton').on("click",deleteUser);
});

function deleteUser(){
	
	if(confirm("Are you sure you want to delete this user?")){	
		var paramsArray = { 
			"id" : $(this).attr("name")
		};
			
		$.ajax({
			type:"POST",
			url: "../admin/handlers.php",
			data: "func=3&params="+JSON.stringify(paramsArray),
			dataType: 'json',
			success: function(data){
				if(data.status == 'success'){
					alert(data.msg);
					location.reload();
				}
				if(data.status == 'error'){
					alert(data.msg);
				}
			},
			error: function(data){
				alert("Problem loading form!");
			}
		});	
	}
}

function openUserDiag(){
	$.ajax({
		type: "POST",
		url: "../admin/forms/userForm.php",
		data: "id="+$(this).attr("name"),
		dataType: 'json',
		success: function(data){
			$('#userDiag').html('');
			$('#userDiag').html(data.form);
			$('#userDiag').dialog('open');
		},
		error: function(data){
			alert("Problem loading user form!");
		}
	});	
}