var cities={1930:['Baltimore', 'Chicago', 'Brooklyn', 'Boston', 'Bronx', 'Brookline',
       'Indianapolis', 'Cleveland', 'Columbus', 'Detroit', 'Los Angeles',
       'Lower Westchester Co.', 'Manhattan', 'Milwaukee Co.', 'Queens',
       'Syracuse', 'Pittsburgh', 'St.Louis', 'Staten Island'],
       1940:['Akron', 'Baltimore', 'Chicago', 'Atlanta', 'Augusta',
       'Atlantic City', 'Birmingham', 'Boston', 'Camden', 'Bronx',
       'Brooklyn', 'Brookline', 'Lower Westchester Co.', 'Cambridge',
       'Detroit', 'Cleveland', 'Columbus', 'Dallas', 'Dayton',
       'Los Angeles', 'Denver', 'Oakland', 'Duluth', 'East Hartford',
       'East St. Louis', 'Greater Kansas City', 'Essex County', 'Flint',
       'Hudson County', 'Indianapolis', 'Louisville', 'Macon',
       'Manhattan', 'Milwaukee Co.', 'Minneapolis', 'New Orleans',
       'New Haven', 'Philadelphia', 'Pittsburgh', 'Portland', 'Queens',
       'San Francisco', 'Richmond', 'Rochester', 'Seattle', 'St.Louis',
       'Somerville', 'Toledo', 'Staten Island', 'Syracuse', 'Trenton'],
       1950:['Akron', 'Chicago', 'Atlanta', 'Arlington', 'Baltimore',
       'Birmingham', 'Belmont', 'Boston', 'Bronx', 'Brockton',
       'Brookline', 'Brooklyn', 'Indianapolis', 'Camden', 'Cambridge',
       'Chattanooga', 'Chelsea', 'Denver', 'Detroit', 'Cleveland',
       'Columbus', 'Dallas', 'Dayton', 'Dedham', 'Duluth', 'Durham',
       'East Hartford', 'East St. Louis', 'Everett', 'Flint',
       'Greater Kansas City', 'Holyoke Chicopee', 'Greensboro',
       'Kalamazoo', 'Lake County Gary', 'Los Angeles', 'Louisville',
       'New Orleans', 'Lower Westchester Co.', 'Manhattan', 'Melrose',
       'Miami', 'Malden', 'Medford', 'Milwaukee Co.', 'Oakland', 'Milton',
       'Minneapolis', 'New Haven', 'Needham', 'Philadelphia', 'Newton',
       'Norfolk', 'St.Louis', 'Pittsburgh', 'Portland', 'Queens',
       'Sacramento', 'San Francisco', 'San Diego', 'San Jose', 'Revere',
       'Quincy', 'Richmond', 'Rochester', 'Saugus', 'Seattle', 'Spokane',
       'Somerville', 'Syracuse', 'Staten Island', 'Toledo', 'Tacoma',
       'Utica', 'Wichita', 'Trenton', 'Waltham', 'Watertown', 'Winthrop'],
       1960:['Akron', 'Albany', 'Altoona', 'Arlington', 'Atlanta', 'Augusta',
       'Canton', 'Atlantic City', 'Aurora', 'Baltimore', 'Chicago',
       'Bergen Co.', 'Belmont', 'Lower Westchester Co.',
       'Binghamton/Johnson City', 'Birmingham', 'Brookline', 'Boston',
       'Camden', 'Bronx', 'Brockton', 'Brooklyn', 'Cambridge',
       'Charlotte', 'Chattanooga', 'Chelsea', 'Cleveland', 'Dayton',
       'Columbus', 'Detroit', 'Indianapolis', 'Dallas', 'Decatur',
       'Denver', 'Dedham', 'Lake County Gary', 'Grand Rapids', 'Duluth',
       'Erie', 'Durham', 'East Hartford', 'East St. Louis',
       'Essex County', 'Los Angeles', 'Evansville', 'Flint', 'Everett',
       'Miami', 'Fort Wayne', 'Fresno', 'Greater Kansas City',
       'Hudson County', 'Hamilton', 'Greensboro', 'Holyoke Chicopee',
       'Jacksonville', 'Johnstown', 'Joliet', 'San Diego', 'Kalamazoo',
       'Knoxville', 'Lexington', 'Lima', 'Lorain', 'Louisville',
       'Milwaukee Co.', 'New Orleans', 'Macon', 'Madison', 'Malden',
       'Manchester', 'Manhattan', 'Medford', 'Melrose', 'Niagara Falls',
       'Milton', 'Pontiac', 'Muskegon', 'Minneapolis', 'New Haven',
       'Mobile', 'Montgomery', 'Portland', 'Muncie', 'Needham',
       'New Britain', 'Newton', 'Norfolk', 'Oakland', 'Schenectady',
       'Philadelphia', 'Pittsburgh', 'Queens', 'San Francisco',
       'Richmond', 'Quincy', 'Revere', 'Rochester', 'Rockford',
       'St.Louis', 'Sacramento', 'Saginaw', 'San Jose', 'Saugus',
       'Seattle', 'Somerville', 'SouthBend', 'Spokane', 'Springfield',
       'St.Petersburg', 'Stamford, Darien, and New Canaan',
       'Staten Island', 'Stockton', 'Syracuse', 'Toledo', 'Tacoma',
       'Tampa', 'Trenton', 'Troy', 'Wichita', 'Utica', 'Waltham',
       'Watertown', 'Wheeling', 'Youngstown', 'Winston Salem', 'Winthrop'],
       1970:['Akron', 'Albany', 'Baltimore', 'Altoona', 'Arlington',
       'Asheville', 'Atlanta', 'Chicago', 'Atlantic City', 'Augusta',
       'Aurora', 'Bay City', 'Battle Creek', 'Belmont', 'Bergen Co.',
       'Binghamton/Johnson City', 'Cleveland', 'Birmingham', 'Detroit',
       'Boston', 'Indianapolis', 'Braintree', 'Brockton', 'Bronx',
       'Brooklyn', 'Brookline', 'SouthBend', 'Cambridge', 'Camden',
       'Canton', 'Charleston', 'Charlotte', 'Chattanooga', 'Chelsea',
       'Columbus', 'Dayton', 'Dallas', 'Decatur', 'Denver', 'Dedham',
       'East St. Louis', 'Duluth', 'Grand Rapids', 'Durham',
       'East Hartford', 'Elmira', 'Erie', 'Greater Kansas City',
       'Essex County', 'Fresno', 'Flint', 'Evansville', 'Everett',
       'Fort Wayne', 'Lake County Gary', 'Hamilton', 'Greensboro',
       'Portland', 'Haverhill', 'Holyoke Chicopee', 'Hudson County',
       'Jacksonville', 'Kalamazoo', 'Johnstown', 'Joliet', 'Kenosha',
       'Knoxville', 'Lexington', 'Lima', 'Lorain', 'Los Angeles', 'Miami',
       'Louisville', 'Milwaukee Co.', 'Lower Westchester Co.',
       'Manhattan', 'Lynchburg', 'Madison', 'Macon', 'Oakland', 'Malden',
       'Manchester', 'Medford', 'Melrose', 'Pontiac', 'Milton',
       'Minneapolis', 'Montgomery', 'Muskegon', 'Mobile', 'Muncie',
       'New Orleans', 'Needham', 'New Britain', 'New Haven', 'Queens',
       'Niagara Falls', 'Newport News', 'Newton', 'Norfolk',
       'Philadelphia', 'San Francisco', 'Oshkosh', 'Staten Island',
       'Pittsburgh', 'Poughkeepsie', 'Racine', 'Sacramento', 'Rochester',
       'Spokane', 'Quincy', 'Revere', 'Richmond', 'Roanoke', 'Rockford',
       'St.Louis', 'Saginaw', 'San Diego', 'San Jose', 'Saugus',
       'Schenectady', 'Seattle', 'Somerville', 'Springfield', 'St.Joseph',
       'St.Petersburg', 'Tampa', 'Stamford, Darien, and New Canaan',
       'Stockton', 'Syracuse', 'Tacoma', 'Terre Haute', 'Toledo',
       'Trenton', 'Troy', 'Utica', 'Wichita', 'Waltham', 'Warren',
       'Watertown', 'Wheeling', 'Winchester', 'Winston Salem', 'Winthrop',
       'Youngstown'],
       1980:['Akron', 'Albany', 'Chicago', 'Altoona', 'Atlantic City',
       'Atlanta', 'Arlington', 'Asheville', 'Augusta', 'Aurora',
       'Baltimore', 'Canton', 'Battle Creek', 'Bay City', 'Bergen Co.',
       'Belmont', 'Binghamton/Johnson City', 'Camden', 'Birmingham',
       'Brooklyn', 'Boston', 'Braintree', 'Brockton', 'Bronx',
       'Brookline', 'Cambridge', 'Charleston', 'Charlotte', 'Chattanooga',
       'Chelsea', 'Decatur', 'Cleveland', 'Niagara Falls', 'Dayton',
       'Columbus', 'Erie', 'Denver', 'Dallas', 'Dedham', 'Grand Rapids',
       'Detroit', 'Duluth', 'Durham', 'East Hartford', 'Los Angeles',
       'East St. Louis', 'Elmira', 'Essex County', 'New Orleans',
       'Evansville', 'Everett', 'Flint', 'Fort Wayne', 'Lake County Gary',
       'Fresno', 'Greater Kansas City', 'Hudson County', 'Miami',
       'Racine', 'Indianapolis', 'Greensboro', 'Hamilton', 'Haverhill',
       'Holyoke Chicopee', 'Jacksonville', 'Johnstown', 'Kenosha',
       'Rochester', 'Joliet', 'Kalamazoo', 'Knoxville', 'Lexington',
       'Lima', 'Lorain', 'Madison', 'Manhattan', 'Oakland', 'Louisville',
       'Oshkosh', 'Portland', 'Lower Westchester Co.', 'Lynchburg',
       'Macon', 'Malden', 'Manchester', 'Medford', 'Melrose',
       'Milwaukee Co.', 'Milton', 'Muskegon', 'Minneapolis', 'Montgomery',
       'Mobile', 'Muncie', 'Needham', 'New Britain', 'New Castle',
       'New Haven', 'Newport News', 'Newton', 'Norfolk', 'Youngstown',
       'Queens', 'Philadelphia', 'Pontiac', 'Pittsburgh', 'Portsmouth',
       'Poughkeepsie', 'Richmond', 'Sacramento', 'Quincy', 'Revere',
       'Roanoke', 'Rockford', 'San Francisco', 'Saginaw', 'San Diego',
       'Spokane', 'San Jose', 'Saugus', 'Springfield', 'Schenectady',
       'Seattle', 'Somerville', 'SouthBend', 'St.Joseph', 'St.Louis',
       'St.Petersburg', 'Staten Island',
       'Stamford, Darien, and New Canaan', 'Toledo', 'Stockton',
       'Syracuse', 'Tacoma', 'Tampa', 'Terre Haute', 'Wichita', 'Troy',
       'Trenton', 'Utica', 'Wheeling', 'Waltham', 'Warren', 'Watertown',
       'Winchester', 'Winston Salem', 'Winthrop'],
       1990:['Akron', 'Albany', 'Altoona', 'Atlanta', 'Arlington', 'Asheville',
       'Atlantic City', 'Bay City', 'Augusta', 'Aurora', 'Baltimore',
       'Battle Creek', 'Detroit', 'Indianapolis', 'Belmont', 'Bergen Co.',
       'Binghamton/Johnson City', 'Birmingham', 'Brooklyn', 'Cambridge',
       'Boston', 'Braintree', 'Chicago', 'Brockton', 'Bronx', 'Camden',
       'Brookline', 'Canton', 'Charleston', 'Charlotte', 'Chattanooga',
       'Chelsea', 'Columbus', 'Cleveland', 'Dayton', 'Dallas', 'Decatur',
       'Denver', 'Dedham', 'East St. Louis', 'Duluth', 'Durham',
       'East Hartford', 'Lake County Gary', 'Essex County', 'Elmira',
       'Erie', 'Greater Kansas City', 'Grand Rapids', 'Evansville',
       'Everett', 'Flint', 'Fort Wayne', 'Fresno', 'Jacksonville',
       'Greensboro', 'Hamilton', 'Hudson County', 'Haverhill', 'Kenosha',
       'Holyoke Chicopee', 'Joliet', 'Johnstown', 'Kalamazoo',
       'Knoxville', 'Lexington', 'Lima', 'Lorain', 'Los Angeles',
       'Lower Westchester Co.', 'Louisville', 'Lynchburg', 'Madison',
       'Macon', 'Manhattan', 'Malden', 'Manchester', 'Melrose', 'Miami',
       'Medford', 'Milwaukee Co.', 'Muncie', 'Milton', 'New Orleans',
       'Minneapolis', 'Montgomery', 'Mobile', 'Muskegon', 'New Haven',
       'Needham', 'New Britain', 'New Castle', 'Newport News',
       'Niagara Falls', 'Newton', 'Oakland', 'Norfolk', 'Philadelphia',
       'Oshkosh', 'Queens', 'Pontiac', 'Pittsburgh', 'Portland', 'Racine',
       'Portsmouth', 'Poughkeepsie', 'Richmond', 'Quincy', 'Revere',
       'Saginaw', 'Roanoke', 'Rochester', 'San Diego', 'Rockford',
       'Sacramento', 'San Jose', 'San Francisco', 'SouthBend',
       'Schenectady', 'Seattle', 'Saugus', 'Wheeling', 'Somerville',
       'Spokane', 'Springfield', 'St.Joseph', 'St.Louis', 'Syracuse',
       'St.Petersburg', 'Staten Island', 'Stockton',
       'Stamford, Darien, and New Canaan', 'Terre Haute', 'Tacoma',
       'Tampa', 'Toledo', 'Wichita', 'Trenton', 'Troy', 'Utica',
       'Waltham', 'Warren', 'Watertown', 'Winston Salem', 'Winchester',
       'Youngstown', 'Winthrop'],
       2000:['Akron', 'Altoona', 'Albany', 'Arlington', 'Asheville', 'Atlanta',
       'Chicago', 'Atlantic City', 'Baltimore', 'Augusta', 'Racine',
       'Aurora', 'Bay City', 'Battle Creek', 'Belmont', 'Bergen Co.',
       'Birmingham', 'Brockton', 'Binghamton/Johnson City', 'Cambridge',
       'Boston', 'Bronx', 'Braintree', 'Brooklyn', 'Camden', 'Brookline',
       'Canton', 'Charleston', 'Charlotte', 'Chattanooga', 'Chelsea',
       'Cleveland', 'Detroit', 'Columbus', 'Grand Rapids', 'Los Angeles',
       'Dallas', 'Dayton', 'Decatur', 'Dedham', 'Denver', 'Duluth',
       'Durham', 'East Hartford', 'East St. Louis', 'Erie', 'Elmira',
       'Essex County', 'Miami', 'Flint', 'Evansville', 'Fresno',
       'Everett', 'Fort Wayne', 'Greater Kansas City', 'Indianapolis',
       'Greensboro', 'Hamilton', 'New Haven', 'Haverhill',
       'Hudson County', 'Holyoke Chicopee', 'Jacksonville', 'Johnstown',
       'Joliet', 'Lake County Gary', 'Kalamazoo', 'Kenosha', 'Knoxville',
       'New Orleans', 'Lexington', 'Lima', 'Lorain',
       'Lower Westchester Co.', 'Louisville', 'Madison', 'Lynchburg',
       'Macon', 'Malden', 'Manchester', 'Manhattan', 'Medford', 'Melrose',
       'Milton', 'Milwaukee Co.', 'Minneapolis', 'Mobile', 'Montgomery',
       'Muncie', 'Muskegon', 'Needham', 'New Britain', 'New Castle',
       'Niagara Falls', 'Newport News', 'Newton', 'Philadelphia',
       'Norfolk', 'Oshkosh', 'Oakland', 'Pontiac', 'Portland',
       'Pittsburgh', 'Rochester', 'San Francisco', 'Portsmouth',
       'Poughkeepsie', 'Queens', 'San Jose', 'Springfield', 'Quincy',
       'Revere', 'Richmond', 'Roanoke', 'Rockford', 'San Diego',
       'Sacramento', 'Schenectady', 'Saginaw', 'Saugus', 'Seattle',
       'Somerville', 'St.Louis', 'SouthBend', 'Spokane', 'St.Joseph',
       'St.Petersburg', 'Staten Island',
       'Stamford, Darien, and New Canaan', 'Syracuse', 'Tacoma',
       'Stockton', 'Tampa', 'Terre Haute', 'Toledo', 'Trenton', 'Troy',
       'Utica', 'Warren', 'Waltham', 'Wichita', 'Watertown', 'Wheeling',
       'Winchester', 'Winston Salem', 'Winthrop', 'Youngstown'],
       2010:['Akron', 'Altoona', 'Camden', 'Albany', 'Arlington', 'Asheville',
       'Atlanta', 'Chicago', 'Atlantic City', 'Baltimore', 'Augusta',
       'Aurora', 'Bergen Co.', 'Battle Creek', 'Bay City', 'Belmont',
       'Binghamton/Johnson City', 'Boston', 'Birmingham', 'Braintree',
       'Detroit', 'Brockton', 'Bronx', 'Brookline', 'Brooklyn',
       'Cambridge', 'Canton', 'Charleston', 'Chattanooga', 'Charlotte',
       'Chelsea', 'Cleveland', 'Los Angeles', 'Denver', 'Columbus',
       'New Orleans', 'Dayton', 'Dallas', 'Decatur', 'Dedham',
       'East St. Louis', 'Erie', 'Duluth', 'Durham', 'Lake County Gary',
       'East Hartford', 'Elmira', 'Essex County', 'Lima', 'Fort Wayne',
       'Evansville', 'Fresno', 'Grand Rapids', 'Everett', 'Flint',
       'Queens', 'Greater Kansas City', 'Racine', 'Indianapolis',
       'Holyoke Chicopee', 'Hamilton', 'Hudson County', 'Greensboro',
       'Haverhill', 'Jacksonville', 'Johnstown', 'Joliet', 'Kalamazoo',
       'Kenosha', 'Knoxville', 'Lexington', 'Lorain',
       'Lower Westchester Co.', 'Louisville', 'Lynchburg', 'Miami',
       'Macon', 'New Haven', 'Madison', 'Malden', 'Manchester',
       'Manhattan', 'Medford', 'Melrose', 'Milwaukee Co.', 'Milton',
       'Minneapolis', 'Mobile', 'Montgomery', 'Niagara Falls', 'Muncie',
       'Muskegon', 'Needham', 'New Britain', 'New Castle', 'Newport News',
       'Philadelphia', 'Newton', 'Norfolk', 'Pontiac', 'Oakland',
       'Portland', 'Oshkosh', 'Richmond', 'Pittsburgh', 'Portsmouth',
       'Poughkeepsie', 'Quincy', 'Revere', 'Roanoke', 'Saginaw',
       'Rochester', 'Sacramento', 'Rockford', 'San Diego',
       'San Francisco', 'Spokane', 'Tacoma', 'Springfield', 'San Jose',
       'Schenectady', 'Saugus', 'Seattle', 'Syracuse', 'Terre Haute',
       'Somerville', 'SouthBend', 'St.Joseph', 'St.Louis',
       'St.Petersburg', 'Staten Island',
       'Stamford, Darien, and New Canaan', 'Stockton', 'Tampa', 'Toledo',
       'Troy', 'Trenton', 'Utica', 'Waltham', 'Warren', 'Wichita',
       'Watertown', 'Wheeling', 'Winchester', 'Winston Salem',
       'Youngstown', 'Winthrop'],
       2016:['Akron', 'Altoona', 'Camden', 'Albany', 'Arlington', 'Asheville',
       'Atlanta', 'Chicago', 'Atlantic City', 'Baltimore', 'Augusta',
       'Aurora', 'Bergen Co.', 'Battle Creek', 'Bay City', 'Belmont',
       'Binghamton/Johnson City', 'Boston', 'Birmingham', 'Braintree',
       'Detroit', 'Brockton', 'Bronx', 'Brookline', 'Brooklyn',
       'Cambridge', 'Canton', 'Charleston', 'Chattanooga', 'Charlotte',
       'Chelsea', 'Cleveland', 'Los Angeles', 'Denver', 'Columbus',
       'New Orleans', 'Dayton', 'Dallas', 'Decatur', 'Dedham',
       'East St. Louis', 'Erie', 'Duluth', 'Durham', 'Lake County Gary',
       'East Hartford', 'Elmira', 'Essex County', 'Lima', 'Fort Wayne',
       'Evansville', 'Fresno', 'Grand Rapids', 'Everett', 'Flint',
       'Queens', 'Greater Kansas City', 'Racine', 'Indianapolis',
       'Holyoke Chicopee', 'Hamilton', 'Hudson County', 'Greensboro',
       'Haverhill', 'Jacksonville', 'Johnstown', 'Joliet', 'Kalamazoo',
       'Kenosha', 'Knoxville', 'Lexington', 'Lorain',
       'Lower Westchester Co.', 'Louisville', 'Lynchburg', 'Miami',
       'Macon', 'New Haven', 'Madison', 'Malden', 'Manchester',
       'Manhattan', 'Medford', 'Melrose', 'Milwaukee Co.', 'Milton',
       'Minneapolis', 'Mobile', 'Montgomery', 'Niagara Falls', 'Muncie',
       'Muskegon', 'Needham', 'New Britain', 'New Castle', 'Newport News',
       'Philadelphia', 'Newton', 'Norfolk', 'Pontiac', 'Oakland',
       'Portland', 'Oshkosh', 'Richmond', 'Pittsburgh', 'Portsmouth',
       'Poughkeepsie', 'Quincy', 'Revere', 'Roanoke', 'Saginaw',
       'Rochester', 'Sacramento', 'Rockford', 'San Diego',
       'San Francisco', 'Spokane', 'Tacoma', 'Springfield', 'San Jose',
       'Schenectady', 'Saugus', 'Seattle', 'Syracuse', 'Terre Haute',
       'Somerville', 'SouthBend', 'St.Joseph', 'St.Louis',
       'St.Petersburg', 'Staten Island',
       'Stamford, Darien, and New Canaan', 'Stockton', 'Tampa', 'Toledo',
       'Troy', 'Trenton', 'Utica', 'Waltham', 'Warren', 'Wichita',
       'Watertown', 'Wheeling', 'Winchester', 'Winston Salem',
       'Youngstown', 'Winthrop']

}