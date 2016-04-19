angular.module('app.controllers', [])

  .controller('billsCtrl', function($scope, $ionicPopup, $ionicListDelegate) {
    $scope.bills =
      [
        {owner: "Lucia", text: "Dinner at 15 East", amount: 100, completed: false},
        {owner: "Ivan", text: "Utility for Jan 16", amount: -50.5, completed: false},
        {owner: "John", text: "Rent for Newport Management", amount: 1070, completed: false},
        {owner: "Steve", text: "Handy for March 2016", amount: 87.00, completed: true},
        {owner: "Lucia", text: "Dinner at 15 East", amount: 100, completed: false},
        {owner: "Ivan", text: "Utility for Jan 16", amount: -50.5, completed: false},
        {owner: "John", text: "Rent for Newport Management", amount: 1070, completed: false},
        {owner: "Steve", text: "Handy for March 2016", amount: 87.00, completed: true},
        {owner: "Lucia", text: "Dinner at 15 East", amount: 100, completed: false},
        {owner: "Ivan", text: "Utility for Jan 16", amount: -50.5, completed: false},
        {owner: "John", text: "Rent for Newport Management", amount: 1070, completed: false},
        {owner: "Steve", text: "Handy for March 2016", amount: 87.00, completed: true}
      ];

    $scope.allBills = false;

    $scope.toggleAllBill = function() {
      $scope.allBills = !$scope.allBills;
    };

    $scope.addBill = function() {
      $scope.data = {};
      $scope.missingOwner = false;
      $scope.missingAmount = false;
      $ionicPopup.show({
        templateUrl: 'templates/addBillTemplate.html',
        title: 'New Bill',
        //subTitle: 'Owner and Amount is required',
        scope: $scope,
        buttons: [
          { text: 'Cancel', onTap: function(e) { return true; } },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.owner && $scope.data.amount) {
                $scope.bills.push({
                  owner: $scope.data.owner,
                  amount: $scope.data.amount,
                  text: $scope.data.text,
                  completed: false
                });
              } else {
                $scope.missingOwner = !$scope.data.owner;
                $scope.missingAmount = !$scope.data.amount;
                e.preventDefault();
              }
            }
          },
        ]
      }).then(function(res) {
        console.log('Tapped!', res);
      }, function(err) {
        console.log('Err:', err);
      }, function(msg) {
        console.log('message:', msg);
      });
    };

    $scope.editBill = function(bill, idx) {
      $scope.editData = JSON.parse(JSON.stringify(bill));
      $scope.missingOwner = false;
      $scope.missingAmount = false;
      $ionicPopup.show({
        templateUrl: 'templates/editBillTemplate.html',
        title: 'Edit Bill',
        //subTitle: 'Owner and Amount is required',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel', onTap: function(e) {
              return true;
            }
          },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.editData.owner && $scope.editData.amount) {
                $scope.bills[idx] = $scope.editData;
                console.log("all bills", $scope.bills);
              } else {
                $scope.missingOwner = !$scope.editData.owner;
                $scope.missingAmount = !$scope.editData.amount;
                e.preventDefault();
              }
            }
          },
        ]
      }).then(function(res) {
        console.log('Tapped!', res);
        $ionicListDelegate.closeOptionButtons()
      }, function(err) {
        console.log('Err:', err);
        $ionicListDelegate.closeOptionButtons()
      }, function(msg) {
        console.log('message:', msg);
        $ionicListDelegate.closeOptionButtons()
      });
    };

  })
