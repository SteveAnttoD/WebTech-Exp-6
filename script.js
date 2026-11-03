$(document).ready(function () {
  $("#year").text(new Date().getFullYear());

  $("#budget-form").on("submit", function (event) {
    event.preventDefault();

    const budgetValue = $("#total-budget").val();
    const percentageValues = [
      $("#accommodation").val(),
      $("#materials").val(),
      $("#emergency").val(),
      $("#savings").val()
    ];

    const budget = Number(budgetValue);
    const percentages = percentageValues.map(Number);
    const hasMissingValue = budgetValue === "" || percentageValues.some(function (value) {
      return value === "";
    });

    let error = "";

    if (hasMissingValue || !Number.isFinite(budget) || budget <= 0) {
      error = "Enter a monthly budget greater than zero and fill in every percentage.";
    } else if (percentages.some(function (percentage) {
      return !Number.isFinite(percentage) || percentage < 0 || percentage > 100;
    })) {
      error = "Each percentage must be a number from 0 to 100.";
    } else if (Math.abs(percentages.reduce(function (total, percentage) {
      return total + percentage;
    }, 0) - 100) > 0.000000001) {
      error = "The four category percentages must add up to exactly 100%.";
    }

    if (error) {
      $("#budget-error").text(error).prop("hidden", false);
      $("#budget-results").prop("hidden", true);
      return;
    }

    $("#budget-error").text("").prop("hidden", true);
    $("#accommodation-result").text((budget * percentages[0] / 100).toFixed(2));
    $("#materials-result").text((budget * percentages[1] / 100).toFixed(2));
    $("#emergency-result").text((budget * percentages[2] / 100).toFixed(2));
    $("#savings-result").text((budget * percentages[3] / 100).toFixed(2));
    $("#budget-results").prop("hidden", false);
  });

  $(".course-toggle").on("click", function () {
    const button = $(this);
    const description = $("#" + button.attr("aria-controls"));
    const isExpanded = button.attr("aria-expanded") === "true";

    description.stop(true, true).slideToggle();
    button.attr("aria-expanded", String(!isExpanded));
    button.text(isExpanded ? "Show description" : "Hide description");
  });
});
