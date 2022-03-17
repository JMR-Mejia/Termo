from scipy.optimize import fsolve


def equations(p):
    a, b, c, d,e ,f,g,h = p
    return a+d-8, 2*b+2*e+h-18, 2*a+b+d+2*f+g+h-12.5, 23.5-c


a, b, c, d,e ,f,g,h = fsolve(equations, (1, 1, 1, 1,1,1,1,1))

print(equations((a, b, c, d,e ,f,g,h)))