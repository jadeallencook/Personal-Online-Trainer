(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{148:function(e,t,a){},150:function(e,t,a){},152:function(e,t,a){},161:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(52),r=a.n(l),i=(a(61),a(63),a(3)),o=a(4),c=a(6),m=a(5),d=a(7),u=a(2),h=a.n(u);a(13),a(22),a(74);function p(){var e=new Date;return e=(e=e.toLocaleDateString()).replace(new RegExp("/","g"),"-")}var b=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).state={email:"",weight:"",height:"",gender:"m",password:"",error:"",signin:!1},e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"validateUserSignup",value:function(e){var t=e.target.getAttribute("name"),a=e.target.value;"email"===t?this.setState({email:a}):"password"===t?this.setState({password:a}):"weight"===t?this.setState({weight:a}):"height"===t&&this.setState({height:a})}},{key:"displayError",value:function(e){var t=this;this.setState({error:e});var a=setInterval(function(){t.setState({error:""}),clearInterval(a)},3e3)}},{key:"createAccount",value:function(){var e=this;this.setState({gender:document.querySelector('input[name="gender"]:checked').getAttribute("value")}),-1===this.state.email.indexOf("@")?this.displayError("Check your email address."):this.state.weight<50?this.displayError("Weight is set incorrectly."):this.state.height<48?this.displayError("Height is set incorrectly."):u.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(t){var a={},n=parseInt(e.state.weight);a[p()]=n,u.database().ref("users/".concat(t.user.uid)).set({weight:n,history:{weight:a},height:parseInt(e.state.height),gender:e.state.gender}).then(function(){e.signin()}).catch(function(e){console.error(e)})}).catch(function(t){e.displayError(t.message)})}},{key:"signinToggle",value:function(){this.setState({signin:!this.state.signin})}},{key:"signin",value:function(){var e=this;u.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch(function(t){e.displayError(t.message)})}},{key:"render",value:function(){return s.a.createElement("div",{className:"signin-wrapper container"},this.state.signin?s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-12"},s.a.createElement("h2",{className:"signin-header animated fadeIn"},"YOUR ACCOUNT"),s.a.createElement("p",{className:"signin-subheader animated fadeIn delay-2"},"We're going to crush it...")),s.a.createElement("div",{className:"col-12"},s.a.createElement("div",{className:"input-group mb-3 animated flipInX delay-1"},s.a.createElement("input",{type:"email",className:"form-control",placeholder:"Email",name:"email",value:this.state.email,onChange:this.validateUserSignup.bind(this)}))),s.a.createElement("div",{className:"col-12"},s.a.createElement("div",{className:"input-group mb-3 animated flipInX delay-1"},s.a.createElement("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",value:this.state.password,onChange:this.validateUserSignup.bind(this)})))):s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-12"},s.a.createElement("h2",{className:"signin-header animated tada"},"LET'S GET FIT!"),s.a.createElement("p",{className:"signin-subheader animated fadeInUp delay-1"},"Find the perfect fitness coach...")),s.a.createElement("div",{className:"col-12"},s.a.createElement("div",{className:"input-group mb-3"},s.a.createElement("input",{type:"email",className:"form-control animated flipInX delay-1",placeholder:"Email",name:"email",value:this.state.email,onChange:this.validateUserSignup.bind(this)}))),s.a.createElement("div",{className:"col-12"},s.a.createElement("div",{className:"input-group mb-3"},s.a.createElement("input",{type:"password",className:"form-control animated flipInX delay-1",placeholder:"Password",name:"password",value:this.state.password,onChange:this.validateUserSignup.bind(this)}))),s.a.createElement("div",{className:"col-6"},s.a.createElement("div",{className:"input-group mb-3"},s.a.createElement("input",{type:"number",className:"form-control animated flipInX delay-1",placeholder:"Weight (lbs)",name:"weight",value:this.state.weight,onChange:this.validateUserSignup.bind(this)}))),s.a.createElement("div",{className:"col-6"},s.a.createElement("div",{className:"input-group mb-3"},s.a.createElement("input",{type:"number",className:"form-control animated flipInX delay-1",placeholder:"Height (inches)",name:"height",value:this.state.height,onChange:this.validateUserSignup.bind(this)}))),s.a.createElement("div",{className:"col-6 gender-selection animated flipInX delay-1"},s.a.createElement("label",{className:"radio-inline"},s.a.createElement("input",{type:"radio",name:"gender",value:"m",onChange:this.validateUserSignup.bind(this),defaultChecked:!0}),"Male")),s.a.createElement("div",{className:"col-6 gender-selection animated flipInX delay-1"},s.a.createElement("label",{className:"radio-inline"},s.a.createElement("input",{type:"radio",name:"gender",value:"f",onChange:this.validateUserSignup.bind(this)}),"Female"))),this.state.error?s.a.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.error):null,s.a.createElement("div",{className:"col-12"},this.state.signin?null:s.a.createElement("button",{type:"submit",className:"create-account-btn btn btn-dark animated flipInX delay-2",onClick:this.createAccount.bind(this)},"Create Account"),this.state.signin?s.a.createElement("button",{type:"submit",className:"create-account-btn btn btn-dark animated flipInX delay-2",onClick:this.signinToggle.bind(this)},"Create Account"):null),s.a.createElement("div",{className:"col-12"},this.state.signin?null:s.a.createElement("button",{type:"submit",className:"signin-btn btn btn-secondary animated flipInX delay-1",onClick:this.signinToggle.bind(this)},"Sign In"),this.state.signin?s.a.createElement("button",{type:"submit",className:"signin-btn btn btn-secondary animated flipInX delay-1",onClick:this.signin.bind(this)},"Sign In"):null))}}]),t}(n.Component),E=(a(76),a(28)),g=(a(78),a(27)),v=a(21),y=a(55),N=a(53),f=a.n(N);function w(e){var t=e.target.getAttribute("data-path").split("-"),a=e.target.value,n={};t.reduce(function(e,a,n){var s=Object(y.a)(e,2),l=s[0],r=s[1];return l[a]=n===t.length-1?r:{},[l[a],r]},[n,a]),n=f()(this.state,n),this.setState(function(){return n})}function k(e,t){return t||(t="object"),!(!e||!t||typeof e!==t)}var I=a(54),O=a.n(I),S=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={user:JSON.parse(JSON.stringify(g)),workout:JSON.parse(JSON.stringify(v.workout)),weight:"",height:"",calories:{limit:""},meal:{title:"",calories:""},burned:{title:"",calories:""},water:{goal:"",drink:""}},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"toggleAvailbleDay",value:function(e){var t=parseInt(e.target.getAttribute("data-val")),a=this.state.workout.repeats;a[t]=this.state.workout.repeats[t]?0:1,this.setState({workout:Object(E.a)({},this.state.workout,{repeats:a})})}},{key:"addWorkout",value:function(){this.setState({workout:{calories:parseInt(this.state.workout.calories)}}),u.database().ref("users/".concat(this.props.AuthUID,"/workouts/")).push(this.state.workout).then(this.setState({workout:JSON.parse(JSON.stringify(v.workout))}))}},{key:"removeWorkout",value:function(e){u.database().ref("users/".concat(this.props.AuthUID,"/workouts/").concat(e)).remove().then(this.setState({workout:JSON.parse(JSON.stringify(v.workout))}))}},{key:"removeWeight",value:function(e){u.database().ref("users/".concat(this.props.AuthUID,"/history/weight/").concat(e)).remove().then(this.setState({weight:""}))}},{key:"addWeight",value:function(){var e=this;this.setState({weight:parseInt(this.state.weight)}),u.database().ref("users/".concat(this.props.AuthUID,"/weight")).set(parseInt(this.state.weight)).then(function(){u.database().ref("users/".concat(e.props.AuthUID,"/history/weight/").concat(p())).set(parseInt(e.state.weight)).then(function(){e.setState({weight:""})})})}},{key:"updateHeight",value:function(){u.database().ref("users/".concat(this.props.AuthUID,"/height")).set(parseInt(this.state.height)).then(this.setState({height:""}))}},{key:"addMeal",value:function(){this.setState({meal:{calories:parseInt(this.state.meal.calories)}}),u.database().ref("users/".concat(this.props.AuthUID,"/history/meals/").concat(p())).push(this.state.meal).then(this.setState({meal:{calories:"",title:""}}))}},{key:"removeMeal",value:function(e){u.database().ref("users/".concat(this.props.AuthUID,"/history/meals/").concat(p(),"/").concat(e)).remove()}},{key:"setCaloriesLimit",value:function(){u.database().ref("users/".concat(this.props.AuthUID,"/goals/calories")).set(parseInt(this.state.calories.limit)).then(this.setState({calories:{limit:""}}))}},{key:"addBurned",value:function(){this.setState({burned:{calories:parseInt(this.state.burned.calories)}}),u.database().ref("users/".concat(this.props.AuthUID,"/history/workouts/").concat(p())).push(this.state.burned).then(this.setState({burned:{calories:"",title:""}}))}},{key:"removeBurned",value:function(e){u.database().ref("users/".concat(this.props.AuthUID,"/history/workouts/").concat(p(),"/").concat(e)).remove()}},{key:"addWater",value:function(){var e=new Date;e="".concat(e.getHours(),":").concat(e.getMinutes()),u.database().ref("users/".concat(this.props.AuthUID,"/history/water/").concat(p(),"/").concat(e)).set(this.state.water.drink).then(this.setState({water:{drink:""}}))}},{key:"removeDrink",value:function(e){u.database().ref("users/".concat(this.props.AuthUID,"/history/water/").concat(p(),"/").concat(e)).remove()}},{key:"setWaterGoal",value:function(){u.database().ref("users/".concat(this.props.AuthUID,"/goals/water")).set(parseInt(this.state.water.goal)).then(this.setState({water:{goal:""}}))}},{key:"componentDidMount",value:function(){var e=this;u.database().ref("users/".concat(this.props.AuthUID)).on("value",function(t){e.setState({user:Object(E.a)({workouts:{},goals:{}},O()({},e.state.user,t.val()))})})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"ProfileComponent"},s.a.createElement("div",{className:"modal fade",id:"tasks-modal",tabIndex:"-1",role:"dialog","aria-labelledby":"tasks-modal","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"tasks-modal"},"YOUR WORKOUTS"),s.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),s.a.createElement("div",{className:"modal-body"},s.a.createElement("p",null,"You can assign yourself workouts or connect with a fitness trainer to assign them for you."),s.a.createElement("table",{className:"table"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{scope:"col"},"WORKOUT"),s.a.createElement("th",{scope:"col"},"REPEATS"),s.a.createElement("th",{scope:"col"},"OPTIONS"))),s.a.createElement("tbody",null,k(this.state.user.workouts)&&Object.keys(this.state.user.workouts).length?Object.keys(this.state.user.workouts).reverse().map(function(t){return s.a.createElement("tr",{key:t},s.a.createElement("th",{scope:"row"},e.state.user.workouts[t].title),s.a.createElement("td",null,7===e.state.user.workouts[t].repeats.reduce(function(e,t){return e+t},0)?"Everyday":e.state.user.workouts[t].repeats.map(function(e,t){return 0===t&&e?"M ":1===t&&e?"T ":2===t&&e?"W ":3===t&&e?"R ":4===t&&e?"F ":5===t&&e?"S ":6===t&&e?"U ":null}),0===e.state.user.workouts[t].repeats.reduce(function(e,t){return e+t},0)?"Never":null),s.a.createElement("td",null,s.a.createElement("button",{type:"button",className:"btn btn-danger option-btn",onClick:function(){e.removeWorkout(t)}},"Remove")))}):s.a.createElement("tr",null,s.a.createElement("th",{scope:"row",colSpan:"3"},s.a.createElement("center",null,"You haven't setup anything workouts!")))))),s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"tasks-modal"},"NEW WORKOUT")),s.a.createElement("div",{className:"modal-body"},s.a.createElement("input",{type:"text",className:"form-control","data-path":"workout-title",value:this.state.workout.title,onChange:function(t){return w.bind(e,t)()},placeholder:"Workout"}),s.a.createElement("div",{className:"day-picker"},s.a.createElement("div",{"data-val":"0",onClick:this.toggleAvailbleDay.bind(this),className:this.state.workout.repeats&&this.state.workout.repeats[0]?"selected":null},"Mon"),s.a.createElement("div",{"data-val":"1",onClick:this.toggleAvailbleDay.bind(this),className:this.state.workout.repeats&&this.state.workout.repeats[1]?"selected":null},"Tue"),s.a.createElement("div",{"data-val":"2",onClick:this.toggleAvailbleDay.bind(this),className:this.state.workout.repeats&&this.state.workout.repeats[2]?"selected":null},"Wed"),s.a.createElement("div",{"data-val":"3",onClick:this.toggleAvailbleDay.bind(this),className:this.state.workout.repeats&&this.state.workout.repeats[3]?"selected":null},"Thu"),s.a.createElement("div",{"data-val":"4",onClick:this.toggleAvailbleDay.bind(this),className:this.state.workout.repeats&&this.state.workout.repeats[4]?"selected":null},"Fri"),s.a.createElement("div",{"data-val":"5",onClick:this.toggleAvailbleDay.bind(this),className:this.state.workout.repeats&&this.state.workout.repeats[5]?"selected":null},"Sat"),s.a.createElement("div",{"data-val":"6",onClick:this.toggleAvailbleDay.bind(this),className:this.state.workout.repeats&&this.state.workout.repeats[6]?"selected":null},"Sun")),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-6"},s.a.createElement("input",{type:"number",className:"form-control","data-path":"workout-calories",value:this.state.workout.calories,onChange:function(t){return w.bind(e,t)()},placeholder:"Calories"})),s.a.createElement("div",{className:"col-6"},s.a.createElement("button",{type:"button",className:"btn btn-dark full-width",onClick:this.addWorkout.bind(this),disabled:!this.state.workout.title||!this.state.workout.calories},"Add Workout"))),s.a.createElement("br",null))))),s.a.createElement("div",{className:"modal fade",id:"weight-modal",tabIndex:"-1",role:"dialog","aria-labelledby":"weight-modal","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"weight-modal"},"YOUR WEIGHT"),s.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),s.a.createElement("div",{className:"modal-body"},s.a.createElement("p",null,"Log your weight to see your progress over time."),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-6"},s.a.createElement("input",{type:"number",className:"form-control","data-path":"weight",value:this.state.weight,onChange:function(t){return w.bind(e,t)()},placeholder:"Pounds"})),s.a.createElement("div",{className:"col-6"},s.a.createElement("button",{type:"button",className:"btn btn-dark full-width",onClick:this.addWeight.bind(this),disabled:!this.state.weight},"Weigh In"))),s.a.createElement("br",null),s.a.createElement("table",{className:"table"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{scope:"col"},"DATE"),s.a.createElement("th",{scope:"col"},"WEIGHT"),s.a.createElement("th",{scope:"col"},"OPTIONS"))),this.state.user.history&&k(this.state.user.history.weight)?Object.keys(this.state.user.history.weight).reverse().map(function(t){return s.a.createElement("tbody",{key:t},s.a.createElement("tr",null,s.a.createElement("th",{scope:"row"},t===p()?"Today":t),s.a.createElement("td",null,e.state.user.history.weight[t]," lbs"),s.a.createElement("td",null,s.a.createElement("button",{type:"button",className:"btn btn-danger option-btn",onClick:function(){return e.removeWeight(t)}},"Remove"))))}):null))))),s.a.createElement("div",{className:"modal fade",id:"bmi-modal",tabIndex:"-1",role:"dialog","aria-labelledby":"bmi-modal","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"bmi-modal"},"YOUR BMI"),s.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),s.a.createElement("div",{className:"modal-body"},s.a.createElement("p",null,"BMI is calculated by using your current weight and height, try keeping it between 20 and 30."),s.a.createElement("p",null,"Your height is set to: ",s.a.createElement("b",null,k(this.state.user.height,"number")?"".concat(this.state.user.height," inche(s)"):"nothing...")),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-6"},s.a.createElement("input",{type:"number",className:"form-control",id:"height","data-path":"height",value:this.state.height,onChange:function(t){return w.bind(e,t)()},placeholder:"Inches"})),s.a.createElement("div",{className:"col-6"},s.a.createElement("button",{type:"button",className:"btn btn-dark full-width",onClick:this.updateHeight.bind(this),disabled:!this.state.height},"Save Height"))))))),s.a.createElement("div",{className:"modal fade",id:"calories-modal",tabIndex:"-1",role:"dialog","aria-labelledby":"calories-modal","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"calories-modal"},"YOUR CALORIES"),s.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),s.a.createElement("div",{className:"modal-body"},s.a.createElement("p",null,"This is how many calories you have left for the day. Your current daily intake limit is set to ",s.a.createElement("b",null,this.state.user.goals.calories),"."),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-8"},s.a.createElement("input",{type:"text",className:"form-control",id:"meal","data-path":"meal-title",value:this.state.meal.title,onChange:function(t){return w.bind(e,t)()},placeholder:"Meal"})),s.a.createElement("div",{className:"col-4"},s.a.createElement("input",{type:"number",className:"form-control",id:"meal-calories","data-path":"meal-calories",value:this.state.meal.calories,onChange:function(t){return w.bind(e,t)()},placeholder:"Calories"})),s.a.createElement("div",{className:"col-12"},s.a.createElement("br",null),s.a.createElement("button",{type:"button",className:"btn btn-dark full-width",disabled:!this.state.meal.title||!this.state.meal.calories,onClick:this.addMeal.bind(this)},"ADD MEAL"))),s.a.createElement("br",null),s.a.createElement("table",{className:"table"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{scope:"col"},"MEAL"),s.a.createElement("th",{scope:"col"},"CALORIES"),s.a.createElement("th",{scope:"col"},"OPTIONS"))),s.a.createElement("tbody",null,this.state.user.history&&k(this.state.user.history.meals)&&k(this.state.user.history.meals[p()])?Object.keys(this.state.user.history.meals[p()]).reverse().map(function(t){var a=e.state.user.history.meals[p()][t];return s.a.createElement("tr",{key:t},s.a.createElement("th",{scope:"row"},a.title),s.a.createElement("td",null,a.calories),s.a.createElement("td",null,s.a.createElement("button",{type:"button",className:"btn btn-danger option-btn",onClick:function(){return e.removeMeal(t)}},"Remove")))}):s.a.createElement("tr",null,s.a.createElement("th",{scope:"row",colSpan:"3"},s.a.createElement("center",null,"You haven't eaten anything today!")))))),s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"tasks-modal"},"DAILY INTAKE LIMIT")),s.a.createElement("div",{className:"modal-body"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-6"},s.a.createElement("input",{type:"number",className:"form-control",id:"calories-goal","data-path":"calories-limit",value:this.state.calories.limit,onChange:function(t){return w.bind(e,t)()},placeholder:"Calories"})),s.a.createElement("div",{className:"col-6"},s.a.createElement("button",{type:"button",className:"btn btn-dark full-width",disabled:!this.state.calories.limit,onClick:this.setCaloriesLimit.bind(this)},"SET LIMIT"))),s.a.createElement("br",null))))),s.a.createElement("div",{className:"modal fade",id:"burned-modal",tabIndex:"-1",role:"dialog","aria-labelledby":"burned-modal","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"burned-modal"},"BURNED CALORIES"),s.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),s.a.createElement("div",{className:"modal-body"},s.a.createElement("p",null,"This is how many calories you've burned today."),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-8"},s.a.createElement("input",{type:"text",className:"form-control",id:"burned-workout","data-path":"burned-title",value:this.state.burned.title,onChange:function(t){return w.bind(e,t)()},placeholder:"Workout"})),s.a.createElement("div",{className:"col-4"},s.a.createElement("input",{type:"number",className:"form-control",id:"burned-calories","data-path":"burned-calories",value:this.state.burned.calories,onChange:function(t){return w.bind(e,t)()},placeholder:"Calories"})),s.a.createElement("div",{className:"col-12"},s.a.createElement("br",null),s.a.createElement("button",{type:"button",className:"btn btn-dark full-width",disabled:!this.state.burned.calories||!this.state.burned.title,onClick:this.addBurned.bind(this)},"ADD WORKOUT"))),s.a.createElement("table",{className:"table"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{scope:"col"},"WORKOUT"),s.a.createElement("th",{scope:"col"},"CALORIES"),s.a.createElement("th",{scope:"col"},"OPTIONS"))),s.a.createElement("tbody",null,this.state.user.history&&k(this.state.user.history.workouts)&&k(this.state.user.history.workouts[p()])?Object.keys(this.state.user.history.workouts[p()]).reverse().map(function(t){var a=e.state.user.history.workouts[p()][t];return s.a.createElement("tr",{key:t},s.a.createElement("th",{scope:"row"},a.title),s.a.createElement("td",null,a.calories),s.a.createElement("td",null,s.a.createElement("button",{type:"button",className:"btn btn-danger option-btn",onClick:function(){return e.removeBurned.bind(e)(t)}},"Remove")))}):s.a.createElement("tr",null,s.a.createElement("th",{scope:"row",colSpan:"3"},s.a.createElement("center",null,"You haven't worked out today!"))))))))),s.a.createElement("div",{className:"modal fade",id:"water-modal",tabIndex:"-1",role:"dialog","aria-labelledby":"water-modal","aria-hidden":"true"},s.a.createElement("div",{className:"modal-dialog",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"water-modal"},"WATER CONSUMPTION"),s.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),s.a.createElement("div",{className:"modal-body"},s.a.createElement("p",null,"This is how much water you've consumed today. You're current daily water consumtion goal is ",s.a.createElement("b",null,k(this.state.user.goals.water,"number")?this.state.user.goals.water:8)," ounce(s)."),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-6"},s.a.createElement("input",{type:"number",className:"form-control",id:"water-drink","data-path":"water-drink",value:this.state.water.drink,onChange:function(t){return w.bind(e,t)()},placeholder:"Ounce(s)"})),s.a.createElement("div",{className:"col-6"},s.a.createElement("button",{type:"button",className:"btn btn-dark full-width",disabled:!this.state.water.drink,onClick:this.addWater.bind(this)},"ADD DRINK"))),s.a.createElement("br",null),s.a.createElement("table",{className:"table"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{scope:"col"},"Ounce(s)"),s.a.createElement("th",{scope:"col"},"Time"),s.a.createElement("th",{scope:"col"},"OPTIONS"))),s.a.createElement("tbody",null,this.state.user.history&&k(this.state.user.history.water)&&k(this.state.user.history.water[p()])?Object.keys(this.state.user.history.water[p()]).reverse().map(function(t){var a=e.state.user.history.water[p()][t],n=t.split(":"),l=Number(n[0]),r=Number(n[1]);return n="",l>0&&l<=12?n=""+l:l>12?n=""+(l-12):0===l&&(n=""),n+=r<10?":0"+r:":"+r,n+=l>=12?" PM":" AM",s.a.createElement("tr",{key:t},s.a.createElement("th",{scope:"row"},a),s.a.createElement("td",null,n),s.a.createElement("td",null,s.a.createElement("button",{type:"button",className:"btn btn-danger option-btn",onClick:function(){return e.removeDrink(t)}},"Remove")))}):s.a.createElement("tr",null,s.a.createElement("th",{scope:"row",colSpan:"3"},s.a.createElement("center",null,"You haven't worked out today!")))))),s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"tasks-modal"},"DAILY GOAL")),s.a.createElement("div",{className:"modal-body"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-6"},s.a.createElement("input",{type:"number",className:"form-control",id:"water-goal","data-path":"water-goal",value:this.state.water.goal||"",onChange:function(t){return w.bind(e,t)()},placeholder:"Ounce(s)"})),s.a.createElement("div",{className:"col-6"},s.a.createElement("button",{type:"button",className:"btn btn-dark full-width",onClick:this.setWaterGoal.bind(this),disabled:!this.state.water.goal},"SET GOAL"))),s.a.createElement("br",null))))),s.a.createElement("div",{className:"container animated fadeIn"},s.a.createElement("div",{className:"row stat-wrapper"},s.a.createElement("div",{className:"col-12"},s.a.createElement("h2",{className:"section-title animated slideInDown"},"YOUR PROFILE")),s.a.createElement("div",{className:"col-4 stat-container"},s.a.createElement("label",{className:"animated fadeInDown delay-1"},"WORKOUTS"),s.a.createElement("button",{type:"button",className:"btn btn-dark animated flipInX delay-1","data-toggle":"modal","data-target":"#tasks-modal"},k(this.state.user.workouts)?Object.keys(this.state.user.workouts).length:0)),s.a.createElement("div",{className:"col-4 stat-container"},s.a.createElement("label",{className:"animated fadeInDown delay-1"},"WEIGHT"),s.a.createElement("button",{type:"button",className:"btn btn-dark animated flipInX delay-1","data-toggle":"modal","data-target":"#weight-modal"},k(this.state.user.weight,"number")?this.state.user.weight:0)),s.a.createElement("div",{className:"col-4 stat-container"},s.a.createElement("label",{className:"animated fadeInDown delay-1"},"BMI"),s.a.createElement("button",{type:"button",className:"btn btn-success animated flipInX delay-1","data-toggle":"modal","data-target":"#bmi-modal"},k(this.state.user.weight,"number")&&k(this.state.user.height,"number")?Math.round(703*this.state.user.weight/(this.state.user.height*this.state.user.height)):"ERROR")),s.a.createElement("div",{className:"stat-spacer col-12"}),s.a.createElement("div",{className:"col-4 stat-container"},s.a.createElement("label",{className:"animated fadeInDown delay-2"},"CALORIES"),this.state.user.goals&&this.state.user.history&&k(this.state.user.goals.calories,"number")&&k(this.state.user.history.meals)&&k(this.state.user.history.meals[p()])?function(){var e=0,t=this.state.user.history.meals[p()];return Object.keys(t).map(function(a){var n=parseInt(t[a].calories);return e+=n,null}),(e=this.state.user.goals.calories-e)<=.4*g.goals.calories?s.a.createElement("button",{type:"button",className:"btn btn-danger animated flipInX delay-2","data-toggle":"modal","data-target":"#calories-modal"},e):s.a.createElement("button",{type:"button",className:"btn btn-success animated flipInX delay-2","data-toggle":"modal","data-target":"#calories-modal"},e)}.bind(this)():s.a.createElement("button",{type:"button",className:"btn btn-success animated flipInX delay-2","data-toggle":"modal","data-target":"#calories-modal"},this.state.user.goals.calories)),s.a.createElement("div",{className:"col-4 stat-container"},s.a.createElement("label",{className:"animated fadeInDown delay-2"},"BURNED"),s.a.createElement("button",{type:"button",className:"btn btn-dark animated flipInX delay-2","data-toggle":"modal","data-target":"#burned-modal"},this.state.user.history&&k(this.state.user.history.workouts)&&k(this.state.user.history.workouts[p()])?function(){var e=this.state.user.history.workouts[p()],t=0;return Object.keys(e).map(function(a){var n=parseInt(e[a].calories);return t+=n,null}),t}.bind(this)():0)),s.a.createElement("div",{className:"col-4 stat-container"},s.a.createElement("label",{className:"animated fadeInDown delay-2"},"WATER"),this.state.user.history&&k(this.state.user.history.water)&&k(this.state.user.history.water[p()])?function(){var e=this.state.user.history.water[p()],t=this.state.user.goals||this.state.user.goals.water?this.state.user.goals.water:8,a=0;return Object.keys(e).map(function(t){return a+=parseInt(e[t]),null}),a<=.5*t?s.a.createElement("button",{type:"button",className:"btn btn-danger animated flipInX delay-2","data-toggle":"modal","data-target":"#water-modal"},a):s.a.createElement("button",{type:"button",className:"btn btn-success animated flipInX delay-2","data-toggle":"modal","data-target":"#water-modal"},a)}.bind(this)():s.a.createElement("button",{type:"button",className:"btn btn-danger animated flipInX delay-2","data-toggle":"modal","data-target":"#water-modal"},"0")),s.a.createElement("div",{className:"col-12"},s.a.createElement("span",{className:"section-footer"},"Update your info by ",s.a.createElement("b",null,"clicking")," the button...")))))}}]),t}(n.Component),A=a(144),C=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={workouts:{},completed:{}},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;h.a.database().ref("users/".concat(this.props.AuthUID,"/workouts")).on("value",function(t){var a=t.val()?Object.keys(t.val()):[],n=[],s=(new Date).getDay()?(new Date).getDay()-1:6;a.forEach(function(e){if(!n[e]){var a=t.val()[e];a.repeats[s]?n[e]=a:0===a.repeats.reduce(function(e,t){return e+t},0)&&(n[e]=a)}}),e.setState({workouts:n})}),h.a.database().ref("users/".concat(this.props.AuthUID,"/history/workouts/").concat(p())).on("value",function(t){e.setState({completed:t.val()})})}},{key:"completeWorkout",value:function(e){var t=this,a=this.state.workouts[e];h.a.database().ref("users/".concat(this.props.AuthUID,"/history/workouts/").concat(p(),"/").concat(e)).set(a).then(function(){0===a.repeats.reduce(function(e,t){return e+t},0)&&h.a.database().ref("users/".concat(t.props.AuthUID,"/workouts/").concat(e)).remove()})}},{key:"undoWorkout",value:function(e){var t=this,a=this.state.completed[e];h.a.database().ref("users/".concat(this.props.AuthUID,"/history/workouts/").concat(p(),"/").concat(e)).remove().then(function(){0===a.repeats.reduce(function(e,t){return e+t},0)&&h.a.database().ref("users/".concat(t.props.AuthUID,"/workouts/").concat(e)).set(a)})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"UserDashboardView"},s.a.createElement(S,{AuthUID:this.props.AuthUID}),s.a.createElement("div",{className:"container animated flipInX full-width-placement",style:{backgroundImage:"url(http://www.muscleandstrength.com/store/media/products/products/c/c4banner1.jpg)"}}),s.a.createElement("div",{className:"container animated fadeIn"},s.a.createElement("div",{className:"row stat-wrapper"},s.a.createElement("div",{className:"col-12"},s.a.createElement("h2",{className:"section-title animated slideInDown"},"TODAY'S WORKOUTS")),k(this.state.workouts)&&Object.keys(this.state.workouts).length?Object.keys(this.state.workouts).map(function(t){var a=e.state.workouts[t];if(!e.state.completed||-1===Object.keys(e.state.completed).indexOf(t))return s.a.createElement("div",{className:"col-12 animated flipInX delay-2 todo-list-item-wrapper",key:t},s.a.createElement("div",{className:"alert alert-secondary todo-list-item",role:"alert"},a.title,s.a.createElement("button",{type:"button",className:"btn btn-dark",onClick:function(){return e.completeWorkout.bind(e)(t)}},"COMPLETE")))}):s.a.createElement("div",{className:"col-12 animated flipInX delay-2 todo-list-item-wrapper"},s.a.createElement("span",{className:"section-footer"},"You don't have any workouts setup yet!"),s.a.createElement("br",null),s.a.createElement("br",null)),this.state.completed?Object.keys(this.state.completed).map(function(t){var a=e.state.completed[t];return s.a.createElement("div",{className:"col-12 animated flipInX delay-2 todo-list-item-wrapper",key:t},s.a.createElement("div",{className:"alert alert-success todo-list-item",role:"alert"},a.title,s.a.createElement("button",{type:"button",className:"btn btn-secondary",onClick:function(){return e.undoWorkout.bind(e)(t)}},"UNDO")))}):null)),s.a.createElement("div",{className:"container animated fadeIn"},s.a.createElement("div",{className:"row stat-wrapper"},s.a.createElement("div",{className:"col-12"},s.a.createElement("h2",{className:"section-title animated slideInDown"},"FITNESS TRAINERS")),s.a.createElement("div",{className:"col-3 animated zoomIn coach-image-wrapper"},s.a.createElement("div",{className:"fitness-profile-photo",style:{backgroundImage:"url('https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-0/p206x206/41109575_10100200014368183_1284167012158799872_n.jpg?_nc_cat=101&_nc_ht=scontent-sjc3-1.xx&oh=b48d78a07553b06919047e95dcab9b1d&oe=5C98E191')"}}),s.a.createElement("h4",null,"Roland"),s.a.createElement("span",null,A.lookup(48708).city)),s.a.createElement("div",{className:"col-3 animated zoomIn coach-image-wrapper"},s.a.createElement("div",{className:"fitness-profile-photo",style:{backgroundImage:"url('https://i.pinimg.com/originals/a4/cd/ba/a4cdbaf1252efdfd69aeb2ce96b8f5ae.jpg')"}}),s.a.createElement("h4",null,"Tyson"),s.a.createElement("span",null,A.lookup(90210).city)),s.a.createElement("div",{className:"col-3 animated zoomIn coach-image-wrapper"},s.a.createElement("div",{className:"fitness-profile-photo",style:{backgroundImage:"url('https://i.pinimg.com/originals/d4/40/1d/d4401da383efc7ac495bb75cc26e796f.jpg')"}}),s.a.createElement("h4",null,"Erick"),s.a.createElement("span",null,A.lookup(84111).city)),s.a.createElement("div",{className:"col-3 animated zoomIn coach-image-wrapper"},s.a.createElement("div",{className:"fitness-profile-photo",style:{backgroundImage:"url('https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/31206367_1746628798729853_2711752882230657024_o.jpg?_nc_cat=104&_nc_ht=scontent-sjc3-1.xx&oh=1616319655991e1c0d366db29e471d6e&oe=5CD0CDF4')"}}),s.a.createElement("h4",null,"Mitch"),s.a.createElement("span",null,A.lookup(48763).city)),s.a.createElement("div",{className:"col-12 view-all-trainers"},s.a.createElement("span",{className:"animated fadeIn delay-2"},"VIEW ALL TRAINERS")))),s.a.createElement("div",{className:"container animated flipInX full-width-placement",style:{backgroundImage:"url(http://2.bp.blogspot.com/-DRnhjG17sRw/UR0RBP2DCSI/AAAAAAAAAT0/LAfVHqUhHAc/s1600/banner_products_mutantmayhem.jpg)"}}))}}]),t}(n.Component),D=(a(148),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light animated slideInDown"},s.a.createElement("span",{className:"navbar-brand"},"ONLINE FITNESS TRAINER"),s.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNavDropdown","aria-controls":"navbarNavDropdown","aria-expanded":"false","aria-label":"Toggle navigation"},s.a.createElement("span",{className:"navbar-toggler-icon"})),u.auth().currentUser?s.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarNavDropdown"},s.a.createElement("ul",{className:"navbar-nav"},s.a.createElement("li",{className:"nav-item"},s.a.createElement("span",{className:"nav-link"},"Trainers")),s.a.createElement("li",{className:"nav-item"},s.a.createElement("span",{className:"nav-link"},"Settings")),s.a.createElement("li",{className:"nav-item"},s.a.createElement("span",{className:"nav-link",onClick:function(){u.auth().signOut()}},"Log Out")))):null)}}]),t}(n.Component)),j=(a(150),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"col-12 footer animated fadeInUp"},s.a.createElement("b",null,"Online Fitness Trainer")," Copyright 2019",s.a.createElement("br",null),"Developed by ",s.a.createElement("b",null,"Onflo")," & ",s.a.createElement("b",null,"GetRoFit"))}}]),t}(n.Component)),U=(a(152),a(154),a(156),a(159),function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).state={user:null,created:!1},h.a.initializeApp({apiKey:"AIzaSyBHiDcWDmvpc8y5WqBsvDhVr8FkPwKDrig",authDomain:"personal-online-trainer.firebaseapp.com",databaseURL:"https://personal-online-trainer.firebaseio.com",projectId:"personal-online-trainer",storageBucket:"",messagingSenderId:"487563225286"}),h.a.auth().onAuthStateChanged(function(t){t?h.a.database().ref("users/".concat(t.uid,"/gender")).once("value",function(a){a.val()&&e.setState({user:t,created:a.val()})}):e.setState({user:null,created:!1})}),e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(D,null),this.state.user&&this.state.created?s.a.createElement(C,{AuthUID:this.state.user.uid,Profile:this.state.created}):s.a.createElement(b,null),s.a.createElement(j,null))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},21:function(e){e.exports={workout:{title:"",repeats:[0,0,0,0,0,0,0],owner:null,calories:""},burned:{workout:"",calories:0,timestamp:""},meal:{meal:"",calories:0}}},27:function(e){e.exports={gender:"m",height:0,weight:0,trainer:null,workouts:{},history:{water:{},meals:{},weight:{},workouts:{}},goals:{water:8,calories:0}}},56:function(e,t,a){e.exports=a(161)},61:function(e,t,a){},74:function(e,t,a){},76:function(e,t,a){},78:function(e,t,a){}},[[56,2,1]]]);
//# sourceMappingURL=main.57932fc1.chunk.js.map