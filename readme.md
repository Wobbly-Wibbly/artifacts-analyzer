# artifacts-analyzer
This utillity cli library helps in comparing 2 build folders.


## How to use

1. Go to your project root folder, make sure that artifacts are allready generated
2. run `npx artifacts-analyzer record build` where `build` is youre artifacts folder. Json stats report would be generated and saved in `./buildSizeLogs.json` so we can compare it later.
3. Now make some changes to your build, and build the project again
4. run `npx artifacts-analyzer compare build`. An HTML report should be generated now, you can find it in your project root at `./buildSizeReport.html`

You will see something like this
![report.html](/media/0416_225905.png 'Report')
