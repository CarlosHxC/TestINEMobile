angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaCamera, $http) {

  $scope.takePhoto = function () {
    var options = {
     quality: 75,
     destinationType: Camera.DestinationType.DATA_URL,
     sourceType: Camera.PictureSourceType.CAMERA,
     allowEdit: true,
     encodingType: Camera.EncodingType.JPEG,
     targetWidth: 300,
     targetHeight: 300,
     popoverOptions: CameraPopoverOptions,
     saveToPhotoAlbum: false,
     correctOrientation: true
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.URI = imageData;
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
        // An error occured. Show a message to the user
    });
  }

  $scope.tryGET = function() {
    $http.get("http://jsonplaceholder.typicode.com/posts/1").then(function(data) {
      console.log(data.data.title)
      $scope.URI = data.data.title;
    }, function(err) {
      console.log(err);
    })
  }
})
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http) {

  $scope.tryPOST = function(data) {
    console.log("post");
    console.log(data.body);
    $http.post('http://jsonplaceholder.typicode.com/posts', {title: data.title, body: data.body, userId: data.id}).then(function(data) {
      console.log(data.data);
      $scope.resultPost = data.data.id;
    }, function(err) {
      console.log(err);
    });
  }
});
