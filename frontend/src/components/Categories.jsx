
function Categories() {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto  px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
            <a href="#" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-800 sm:block">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
  
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
            <div className="group aspect-h-1 aspect-w-2  overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-4 sm:row-span-2">
              <img
                alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                src="https://images.unsplash.com/photo-1529498933046-3b8c8c19407d?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="object-cover object-center group-hover:opacity-75 w-2/3"
              />
              <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
              <div className="flex items-end p-6">
                <div className="">
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      New Arrivals
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
            <div className="group aspect-h-2 aspect-w-3 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
              <img
                alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                src="https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=3089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="object-cover object-top group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Accessories
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
            <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
              <img
                alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                src="https://images.unsplash.com/photo-1616353071588-708dcff912e2?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Workspace
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="mt-6 sm:hidden">
            <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
  

  export default Categories;