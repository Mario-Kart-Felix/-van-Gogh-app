#von-Gogh
Reading and Using STATA Output
This handout is designed to explain the STATA readout you get when doing regression. If you need help getting data into STATA or doing basic operations, see the earlier STATA handout.

I begin with an example.

In the following statistical model, I regress 'Depend1' on three independent variables. Depend1 is a composite variable that measures perceptions of success in federal advisory committees. The 'balance' variable measures the degree to which membership is balanced, the 'express' variable measures the opportunity for the general public to express opinions at meetings, and the 'prior' variable measures the amount of preparatory information committee members received prior to meetings. I get the following readout.

. reg Depend1 balance express prior

  Source |       SS       df       MS                  Number of obs =     337
---------+------------------------------               F(  3,   333) =  101.34
   Model |  129.990394     3  43.3301314               Prob > F      =  0.0000
Residual |  142.381532   333  .427572167               R-squared     =  0.4773
---------+------------------------------               Adj R-squared =  0.4725
   Total |  272.371926   336  .810630731               Root MSE      =  .65389

------------------------------------------------------------------------------
 Depend1 |      Coef.   Std. Err.       t     P>|t|       [95% Conf. Interval]
---------+--------------------------------------------------------------------
 balance |   .3410554   .0498259      6.845   0.000       .2430421    .4390686
 express |  -.3248486   .0878143     -3.699   0.000      -.4975894   -.1521079
   prior |   .4562601   .0443442     10.289   0.000       .3690301    .5434901
   _cons |  -3.047717   .2280971    -13.361   0.000      -3.496409   -2.599024
------------------------------------------------------------------------------
A quick glance at the t-statistics reveals that something is likely going on in this data. Do we know for certain that there is something going on? Yes. Look at the F(3,333)=101.34 line, and then below it the Prob > F = 0.0000. STATA is very nice to you. It automatically conducts an F-test, testing the null hypothesis that nothing is going on here (in other words, that all of the coefficients on your independent variables are equal to zero). We reject this null hypothesis with extremely high confidence - above 99.99% in fact.

So now that we are pretty sure something is going on, what now?

Generally, we begin with the coefficients, which are the 'beta' estimates, or the slope coefficients in a regression line. In this case the 'line' is actually a 3-D hyperplane, but the meaning is the same.

First, consider the coefficient on the constant term, '_cons". It is obviously large and significant. This is the intercept for the regression line (in this case, the regression hyperplane). It is the default predicted value of Depend1 when all of the other variables equal zero. Does this have any intuitive meaning? Well, consider the following chart:

. sum Depend1 balance express prior

Variable |     Obs        Mean   Std. Dev.       Min        Max
---------+-----------------------------------------------------
 Depend1 |     359   -6.39e-09   .9367157  -4.089263   1.008503  
 balance |     584    4.239726   .7780637          1          5  
 express |     597    .5678392   .4276565          0          1  
   prior |     580    4.149425   .8828358          1          5  
Most of the variables never equal zero, which makes us wonder what meaning the intercept has. By itself, not much. In some regressions, the intercept would have a lot of meaning. Here it does not, and I wouldn't spend too much time writing about it in the paper.

I'm much more interested in the other three coefficients. How do I begin to think about them?

There are two important concepts here. One is magnitude, and the other is significance.

Magnitude is the size of the effect - that is, how big the coefficient is. If you increase the balance variable by 1, how much does the Depend1 variable increase (or decrease) by? Be careful here to consider the scale of your variable. If you are using dollars as an independent variable, and you switch to using millions of dollars, the value of your coefficient will drop to a millionth what it was. Did the magnitude of your coefficient change? Not really. We just rescaled. The same is true when you rescale the dependent variable, from employees to millions of employees for example. So given the scaling issue, how do you know when something is important or not? Partly, you make a judgement. If you want a slightly more consistent method in which to make the judgement, ask yourself the following question: If you increase the independent variable by one of its own standard deviations, how much does the dependent variable increase or decrease by? So in my own regression, I might ask: If I increase 'balance' by 0.778, how much does this affect Depend1? The predicted effect is an increase of 0.778*0.341 = 0.265. Is 0.265 big? Well, the standard deviation of Depend1 is 0.937. Thus, an increase of one standard deviation in 'balance' causes an increase of 0.265/0.937 = 0.283 of a standard deviation in 'Depend1'.
Significance is the statistical significance of your estimated coefficient. Do not confuse significance with magnitude. It is more related to the precision of your estimate. Significance is typically measured by your t-statistic, or your p-value in the regression readout. These are the columns 't' and 'P>|t|'. Typically, a t-statistic above 2 or below -2 is considered significant at the 95% level. We use 2 as a rule of thumb because in the t-distribution we need to know how many degrees of freedom we have (d.f. = number of observations - number of variables) before we can decide whether the value of the t-statistic is significant at the 95% level. If t is very, very large, then we can use the normal distribution, and the t-statistic is significant if it's above 1.96. If you have few observations in the regression, you might need a slightly higher t-statistic for the coefficient to be significant.
So where does the t-statistic come from? Do you see the column marked 'std. err.'? This stands for the standard error of your estimate. The number in the t-statistic column is equal to your coefficient divided by the standard error. It thus measures how many standard deviations away from zero your estimated coefficient is. This is an implicit hypothesis test against the Null Hypothesis that nothing is going on with that variable - or in other words, that the real coefficient is zero. If the real coefficient were zero, then we'd expect the estimated coefficient to fall within two standard deviations of zero 95% of the time. If we observe an estimate of the coefficient more than two standard deviations away from zero, then we have reason to think that the Null Hypothesis is very unlikely. If we reject the null hypothesis with 95% confidence, then we typically say that our independent variable has a statistically significant effect on our dependent variable. That effect could be very small in real terms - indeed, if we have tends of thousands of observations, we can identify really small effects very precisely. Thus, a small effect can be significant. Review our earlier work on calculating the standard error of of an estimate to see why - we'll probably go over this again in class too.

So what, then, is the P-value? The p-value is a matter of convenience for us. STATA automatically takes into account the number of degrees of freedom and tells us at what level our coefficient is significant. If it is significant at the 95% level, then we have P < 0.05. If it is significant at the 0.01 level, then P < 0.01. In our regression above, P < 0.0000, so out coefficient is significant at the 99.99+% level.

Just to drive the point home, STATA tells us this in one more way - using the confidence interval. The confidence interval is equal to the the coefficient +/- about 2 standard deviations. We are 95% confident that the true value of the coefficient in the model which generated this data falls within this value. Note that zero is never within the confidence interval for any of my variables, which we expect because the t-statistics are high and the P-values are low.

So what does all the other stuff in that readout mean?

First, the R-squared. The R-squared is typically read as the 'percent of variance explained'. It is a measure of the overall fit of the model. For social science, 0.477 is fairly high. The Adjusted R-squared is just another measure of goodness of fit that penalizes me slightly for using extra independent variables - essentially, it adjusts for the degrees of freedom I use up in adding these independent variables. In this case, it's not a big worry because I have only 3 variables and 337 observations. You might consider using the adjusted R-squared in datasets with low numbers of observations (30 or less) or when you are using a lot of independent variables.

The Root MSE, or root mean squared error, is the square root of 0.427, or the mean squared error. You can find the MSE, 0.427, in right hand side of the subtable in the upper left section of the readout. This subtable is called the ANOVA, or analysis of variance, table. The Root MSE is essentially the standard deviation of the residual in this model. The MSE, which is just the square of the root MSE, is thus the variance of the residual in the model. To understand this, we briefly walk through the ANOVA table (which we'll do again in class).

The ANOVA table has four columns, the Source, the Sum of Squares, the degrees of freedom, and the Mean of the Sum of Squares.

The error sum of squares is the sum of the squared residuals, 'e', from each observation. If you recall, 'e' is the part of Depend1 that is not explained by the model. The model sum of squares is the sum of the squared deviations from the mean of Depend1 that our model does explain. A good model has a model sum of squares and a low residual sum of squares.

Our R-squared value equals our model sum of squares divided by the total sum of squares. It is the percentage of the total sum of squares explained by the model - or, as we said earlier, the percentage of the total variance of Depend1 explained by the model. That is where we get the goodness of fit interpretation of R-squared.

The mean sum of squares for the Model and the Residual is just the sum of squares for those parts, divided by the degrees of freedom left over to obtain these estimates for each piece.

You should recognize the mean sum of squared errors - it is essentially the estimate of sigma-squared (the variance of the residual). This is the sum of squared residuals divided by the degrees of freedom, N-k. In this case, N-k = 337 - 4 = 333. Why is this important? Because we use the mean sum of squared errors in obtaining our estimates of the variances of each coefficient, and in conducting all of our statistical tests.

Writing About STATA output
Once you get your data into STATA, you will discover that you can generate a lot of output really fast, often without even understanding what it really means. However much trouble you have understanding your data, expect your reader to have ten times that much difficulty. It is therefore your job to explain your data and output to us in the clearest manner possible.

At the bare minimum, your paper should have the following sections: Abstract, Introduction, Theoretical Background or Literature Review, Data Summary, Analysis, Discussion and Conclusions. Since this is a class paper and not a journal paper, some of these sections can be very brief. You should by now be familiar with writing most of this paper, but you may have some concern about how to use data in writing. Here are some basic rules.

Always discuss your data. Give us a simple list of variables with a brief description, and perhaps the mean and standard deviation of the variables. STATA can do this with the summarize command. Tell us where you got the data, how you gathered it, any difficulties you might have encountered, any concerns you might have. Explain what the scales of the variables are if there is anything that is not obvious. Did you have any missing data? If so, what problems might it cause and how did you work around them?
Before doing your quantitative analysis, make sure you have explained the theory and the reasons why your data helps you make sense of or test your theories. What is the quantitative analysis contributing to our understanding of your research problem? Explain how you expect your independent variables to impact your dependent variable. What are the possible outcomes, and what do they mean? Present your results. Do not use STATA readout directly - copy it into a pretty Word table or something similar. Your table might look something like this (but more professional, hopefully, with borders and properly aligned columns):



Variable	Model1	Model2
Express	0.341 (6.85)	-0.286 (-0.270)
Balance	-0.325 (-3.70)	0.327 (6.75)
Prior	0.456 (10.3)	0.428 (9.86)
Openmeet	--	-0.174 (-4.78)
Constant	-3.05 (-13.4)	-2.63 (-11.0)
R-squared (N)	0.4773 (337)	0.510 (336)
This table summaries everything from the STATA readout table that we want to know in the paper.

Make sure to indicate whether the numbers in parentheses are t-statistics, as they are in this case, or standard errors, or even p-values. Just be consistent. After you are done presenting your data, discuss your data. What do the variables mean, are the results significant, etc. Interpret these numbers for us. Tell us which theories they support, and what everything means. Are you confident in your results? What else might you have done?
You should note that in the table above, there was a second column. So why the second column, Model2? Because I have a fourth variable I haven't used yet.

  Source |       SS       df       MS                  Number of obs =     336
---------+------------------------------               F(  4,   331) =   86.27
   Model |  138.541532     4  34.6353831               Prob > F      =  0.0000
Residual |   132.89241   331  .401487644               R-squared     =  0.5104
---------+------------------------------               Adj R-squared =  0.5045
   Total |  271.433943   335  .810250575               Root MSE      =  .63363

------------------------------------------------------------------------------
 Depend1 |      Coef.   Std. Err.       t     P>|t|       [95% Conf. Interval]
---------+--------------------------------------------------------------------
 express |  -.0285837   .1058492     -0.270   0.787      -.2368057    .1796383
 balance |   .3267551    .048381      6.754   0.000        .231582    .4219282
   prior |   .4277068   .0433962      9.856   0.000       .3423397    .5130739
openmeet |  -.1737696   .0363659     -4.778   0.000      -.2453069   -.1022322
   _cons |  -2.627165   .2374349    -11.065   0.000      -3.094236   -2.160093
This is the regression for my second model, the model which uses an additional variable - whether the committee had meetings open to the public. Note that when the openmeet variable is included, the coefficient on 'express' falls nearly to zero and becomes insignificant. In other words, controlling for open meetings, opportunities for expression have no effect. But if we fail to control for open meetings, than 'express' picks up the effect of open meetings because opportunities for expression is highly correlated with open meetings. This is an important piece of interpretation - you should point this out to the reader.

Why did I combine both these models into a single table? Because it is more concise, neater, and allows for easy comparison. Generally, you should try to get your results down to one table or a single page's worth of data. Too much data is as bad as too little data.

A word about graphs:

In your writing, try to use graphs to illustrate your work. Numbers say a lot, but graphs can often say a lot more. You might use graphs to demonstrate the skew in an interesting variable, the slope of a regression line, or some weird irregularity that may be confounding your linear model. Always keep graphs simple and avoid making them overly fancy.

Inserting Graphs Into MS Word:

As this didn't make it onto the handout, here it is in email. I'll add it to the web handout as well when I get the chance.

In STATA, when type the graph command as follows:

. graph Y X, saving mygraph
STATA will create a file "mygraph.gph" in your current directory. Unfortunately, only STATA can read this file. In order to make it useful to other programs, you need to convert it into a postscript file. To do this, in STATA, type:

. translate mygraph.gph mygraph.ps
STATA then creates a file called "mygraph.ps" inside your current directory. You can now print this file on Athena by exiting STATA and printing from the Athena prompt.

Alternatively, you could type:

. translate mygraph.gph mygraph.eps
This creates an encapsulated postscript file, which can be imported into MS Word. In MS Word, click on the "Insert" tab, go to "Picture", and then go to "*.eps" files. This stands for encapsulated postscript files. You should be able to find "mygraph.ps" in the browsing window, and insert it into your MS Word file without too much difficulty.

Final Word:

Find a professionally written paper or two from one of the many journals in Dewey library, and read these. Make sure you find a paper that uses a lot of data. You don't have to be as sophisticated about the analysis, but look how the paper uses the data and results. Get a feel for what you are doing by looking at what others have done.
