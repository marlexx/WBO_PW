
Testrail integration command:
trcli -y -h https://maliurosss.testrail.io --project "prvi" --username uros@wedoqa.co --password Invalid1covek# parse_junit --title "Playwright Automated Test Run" -f "./junitReport/junit-report.xml" 

Every test needs to be run on 1 project individualy! You will make duplicate IDs if you run on multiple project and testrail will not upload the results.

Command for the whole test suite + upload to testrail USE CMD ** CHANGE DATE:
npx playwright test --project=chromium & trcli -y -h https://maliurosss.testrail.io --project "prvi" --username uros@wedoqa.co --password Invalid1covek# parse_junit --title "Playwright Automated Test Run 4/13/2023" -f "./junitReport/junit-report.xml"