export const Footer = () => {
  return (
    <div className="bg-gray-100">
      <div className="w-10/12 m-auto py-4">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 text-gray-600 text-sm">
            <h3 className="text-lg uppercase font-bold mb-2">happy home</h3>
            <div className="flex items-center my-1">
              <i className="fas fa-map-marker mr-3"></i>
              <p>Khu Đô Thị Mới Dương Nội, Hà Đông, Hà Nội</p>
            </div>
            <div className="flex items-center my-1">
              <i className="fas fa-phone-alt mr-3"></i>
              <p>0389885682</p>
            </div>
            <div className="flex items-center my-1">
              <i className="fas fa-globe-americas mr-3"></i>
              <p>codergenz.com</p>
            </div>
            <div className="flex items-center my-1">
              <i className="fas fa-envelope mr-3"></i>
              <p>codergenz@gmail.com</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
